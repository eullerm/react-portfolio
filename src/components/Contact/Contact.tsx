import styled from "@emotion/styled";

const contacts = [
  { label: "GitHub", url: "https://github.com" },
  { label: "LinkedIn", url: "https://linkedin.com" },
  { label: "Email", url: "mailto:email@example.com" },
];

const Section = styled.section`
  padding: 4rem 2rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const Links = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
`;

const Link = styled.a`
  color: #61dafb;
  font-size: 1.2rem;
  text-decoration: none;
  &:hover {
    color: #fff;
  }
`;

const Contact = () => {
  return (
    <Section>
      <Title>Contato</Title>
      <Links>
        {contacts.map((c, i) => (
          <Link key={i} href={c.url} target="_blank" rel="noopener noreferrer">
            {c.label}
          </Link>
        ))}
      </Links>
    </Section>
  );
};

export default Contact;
