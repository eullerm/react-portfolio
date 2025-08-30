import styled from "@emotion/styled";

const projects = [
  { title: "Projeto 1", description: "Descrição do projeto 1", link: "https://github.com" },
  { title: "Projeto 2", description: "Descrição do projeto 2", link: "https://github.com" },
];

const Section = styled.section`
  padding: 4rem 2rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const Card = styled.div`
  background-color: #1a1a1a;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
`;

const Link = styled.a`
  color: #61dafb;
  text-decoration: none;
  &:hover {
    color: #fff;
  }
`;

const Projects = () => {
  return (
    <Section>
      <Title>Projetos</Title>
      <Grid>
        {projects.map((p, i) => (
          <Card key={i}>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <Link href={p.link} target="_blank" rel="noopener noreferrer">
              Ver mais
            </Link>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

export default Projects;
