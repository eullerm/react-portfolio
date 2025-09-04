import { SPREADSHEET_ID, token, WORKSHEETS } from "../config/googleSheets";
import type { Experience } from "../models/experience";
import { parseDate } from "../utils/parseDate";

async function fetchSheet(sheetName: string) {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${sheetName}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      throw new Error(
        `Erro ${res.status}: Falha ao buscar planilha "${sheetName}"`
      );
    }

    const data = await res.json();
    return data.values ?? [[]];
  } catch (e) {
    throw e;
  }
}

export const SheetsApi = {
  getAuthor: async (language: string) => {
    const rows = await fetchSheet(WORKSHEETS.author);
    const json = convertSheetToJson(rows);
    return filterByLanguage(json, language)[0];
  },
  getExperiences: async (language: string) => {
    const rows = await fetchSheet(WORKSHEETS.experiences);
    const json = convertSheetToJson(rows);

    return filterByLanguage(json, language).sort(
      (a: Experience, b: Experience) => {
        // If 'a' is current and 'b' is not, 'a' comes first
        if (a.endDate === null && b.endDate !== null) return -1;

        // If 'b' is current and 'a' is not, 'b' comes first
        if (b.endDate === null && a.endDate !== null) return 1;
        const dateA = parseDate(a.startDate);
        const dateB = parseDate(b.startDate);

        return (dateB?.getTime() || 0) - (dateA?.getTime() || 0);
      }
    );
  },
  getSkills: async () => {
    const rows = await fetchSheet(WORKSHEETS.skills);
    const flatted = rows.flat();
    return flatted.slice(1); // Remove header
  },
  getProjects: async () => {
    const rows = await fetchSheet(WORKSHEETS.projects);
    return convertSheetToJson(rows);
  },
  getThanks: async (language: string) => {
    const rows = await fetchSheet(WORKSHEETS.thanks);
    const json = convertSheetToJson(rows);
    return filterByLanguage(json, language);
  },
  getUpdatedAt: async () => {
    const rows = await fetchSheet(WORKSHEETS.updatedAt);
    return rows[0] ? new Date(rows[0][1]) : null;
  },
};

function convertSheetToJson(data: any) {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("Dados inválidos: esperado array de arrays");
  }

  const [headers, ...rows] = data;

  if (!Array.isArray(headers)) {
    throw new Error("Cabeçalhos inválidos: esperado array");
  }

  return rows.map((row) =>
    headers.reduce((obj: any, header: string, index: number) => {
      obj[header] = row[index] || null;
      return obj;
    }, {})
  );
}

function filterByLanguage(json: any, language: string) {
  return json.filter((item: any) => item.language === language);
}
