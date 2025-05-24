# 🌿 Projeto Saúde Mental - Calmind

![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow) 
![License](https://img.shields.io/badge/Licença-MIT-blue)
![Plataforma](https://img.shields.io/badge/Plataforma-Web-green)

> 🧘 Um aplicativo para auxiliar usuários a lidar com a ansiedade, oferecendo ferramentas de autoconhecimento, planejamento de atividades e acompanhamento emocional.

🔗 **Acesse o projeto**: [Calmind](https://calmind-sigma.vercel.app/)  

---

## 🧠 Objetivo

- Auxiliar usuários a monitorar seu estado emocional.  
- Fornecer planejamento de atividades para autoconhecimento.    
- Oferecer dicas personalizadas para o bem-estar mental.  

---

## 🎯 Público-Alvo

✅ Pessoas que lidam com ansiedade e buscam apoio.  
✅ Usuários que desejam acompanhar seu estado emocional ao longo do tempo.  

---

## 🚀 Funcionalidades Principais

📌 **Home** – Introdução ao site, frases motivacionais e chamada para registrar o humor.  
📌 **Registro do Humor** – Formulário para o usuário selecionar seu humor diário e receber dicas personalizadas.  
📌 **Dicas & Recursos** – Seção com recomendações e estratégias para melhorar o bem-estar.  

---

## 🛠️ Tecnologias Utilizadas

📌 **Front-end**  
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)  
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)  
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)  
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat&logo=vite&logoColor=FFD62E)  

📌 **Documentação**  
![Docusaurus](https://img.shields.io/badge/Docusaurus-FB7185?style=flat&logo=docusaurus&logoColor=white)  

📌 **Outras Ferramentas**  
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white)  
![PostCSS](https://img.shields.io/badge/PostCSS-DD3A0A?style=flat&logo=postcss&logoColor=white)  

---

## 📂 Estrutura do Projeto

```bash
📦 calmind
├── 📁 src
│   ├── 📂 components        # Componentes reutilizáveis
│   ├── 📂 pages             # Páginas principais
│   ├── 📂 hooks             # Hooks customizados
│   ├── 📂 styles            # Estilos do projeto
├── 📁 public                # Arquivos públicos e estáticos
├── 📁 docs                  # Documentação com Docusaurus
├── .env.example             # Exemplo de variáveis de ambiente
├── package.json             # Dependências do projeto
└── README.md                # Documentação principal
```

## Clone o repositório
```bash
git clone https://github.com/Mayronsf/calmind.git

# Acesse a pasta do projeto
cd calmind

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## 🌟 Funcionalidades

- **Registro de Humor**: Registre seu humor diariamente com notas e emojis
- **Dashboard Interativo**: Visualize sua evolução de humor ao longo do tempo
- **Atividades Recomendadas**: Receba sugestões personalizadas baseadas no seu humor
- **Estatísticas Detalhadas**: Acompanhe sua média de humor, picos e tendências
- **Interface Responsiva**: Acesse de qualquer dispositivo com uma experiência otimizada

## 🚀 Tecnologias Utilizadas

- React + TypeScript
- Vite
- Tailwind CSS
- Chart.js para visualizações
- Supabase para backend e autenticação
- React Router para navegação

## 📦 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Mayronsf/calmind.git
cd calmind
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 🔧 Configuração do Banco de Dados

Execute os seguintes comandos SQL no seu projeto Supabase:

```sql
-- Tabela de usuários (já criada automaticamente pelo Supabase)
-- auth.users

-- Tabela de perfis de usuário
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tabela de registros de humor
create table public.mood_entries (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  mood_level integer not null check (mood_level >= 1 and mood_level <= 5),
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Políticas de segurança
alter table public.profiles enable row level security;
alter table public.mood_entries enable row level security;

create policy "Usuários podem ver seus próprios perfis"
  on public.profiles for select
  using ( auth.uid() = id );

create policy "Usuários podem atualizar seus próprios perfis"
  on public.profiles for update
  using ( auth.uid() = id );

create policy "Usuários podem ver seus próprios registros de humor"
  on public.mood_entries for select
  using ( auth.uid() = user_id );

create policy "Usuários podem inserir seus próprios registros de humor"
  on public.mood_entries for insert
  with check ( auth.uid() = user_id );

create policy "Usuários podem atualizar seus próprios registros de humor"
  on public.mood_entries for update
  using ( auth.uid() = user_id );

create policy "Usuários podem deletar seus próprios registros de humor"
  on public.mood_entries for delete
  using ( auth.uid() = user_id );
```

## 🌐 Deploy

O projeto está configurado para deploy na Vercel. Para fazer o deploy:

1. Faça push das alterações para o GitHub
2. Conecte seu repositório na Vercel
3. Configure as variáveis de ambiente na Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy automático será realizado

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📧 Contato

Mayron Ferreira - [@mayronsf](https://github.com/Mayronsf)

Link do Projeto: [https://github.com/Mayronsf/calmind](https://github.com/Mayronsf/calmind)
