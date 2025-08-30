import { SPREADSHEET_ID, token, WORKSHEETS } from "../config/googleSheets";

async function fetchSheet(sheetName: string) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${sheetName}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  return data.values ?? [];
}

export const SheetsApi = {
  getAuthor: async (language: string) => {
    const rows = await fetchSheet(WORKSHEETS.author);
    return filterByLanguage(rows, language)[0];
  },
  getExperiences: async (language: string) => {
    const rows = await fetchSheet(WORKSHEETS.experiences);
    return filterByLanguage(rows, language);
  },
  getSkills: async () => await fetchSheet(WORKSHEETS.skills),
  getProjects: async () => await fetchSheet(WORKSHEETS.projects),
  getThanks: async (language: string) => {
    const rows = await fetchSheet(WORKSHEETS.thanks);
    return filterByLanguage(rows, language);
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

function filterByLanguage(sheetData: any, language: string) {
  const json = convertSheetToJson(sheetData);
  console.log(json);
  return json.filter((item: any) => item.language === language);
}
