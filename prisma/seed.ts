import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const permissions = [
  ["platform.admin", "Administrar parametros globais da plataforma"],
  ["users.admin", "Administrar usuarios, agentes e aprovadores"],
  ["settings.admin", "Administrar configuracoes"],
  ["specifications.read", "Consultar especificacoes funcionais"],
  ["specifications.create", "Criar registros do modulo de especificacoes"],
  ["specifications.edit", "Editar registros do modulo de especificacoes"],
  ["specifications.delete", "Excluir registros quando permitido"],
  ["functional_item.create", "Criar particularidades e funcoes"],
  ["functional_item.edit", "Editar particularidades e funcoes"],
  ["functional_item.version", "Gerar novas versoes funcionais"],
  ["approval.read", "Consultar demandas de aprovacao"],
  ["approval.approve", "Aprovar alteracoes"],
  ["approval.reject", "Reprovar alteracoes"],
  ["documents.generate", "Gerar documentos DOCX/PDF"],
  ["audit.read", "Consultar logs de auditoria"],
  ["dashboard.read", "Consultar dashboard e indicadores"]
] as const;

const roles = [
  {
    code: "master_admin",
    name: "Administrador master",
    description: "Conta master inicial para parametrizacao e governanca da plataforma.",
    permissions: permissions.map(([code]) => code)
  },
  {
    code: "admin",
    name: "Administrador",
    description: "Administra cadastros, usuarios e operacao do modulo.",
    permissions: permissions.map(([code]) => code).filter((code) => code !== "platform.admin")
  },
  {
    code: "editor_agent",
    name: "Agente cadastrador/editor",
    description: "Cadastra e edita especificacoes funcionais.",
    permissions: [
      "specifications.read",
      "specifications.create",
      "specifications.edit",
      "functional_item.create",
      "functional_item.edit",
      "functional_item.version",
      "dashboard.read"
    ]
  },
  {
    code: "approver_agent",
    name: "Agente aprovador",
    description: "Avalia demandas de alteracao conforme escopo de aprovacao.",
    permissions: [
      "specifications.read",
      "approval.read",
      "approval.approve",
      "approval.reject",
      "dashboard.read",
      "audit.read"
    ]
  },
  {
    code: "viewer",
    name: "Usuario de consulta",
    description: "Consulta informacoes e documentos sem alterar dados.",
    permissions: ["specifications.read", "dashboard.read"]
  }
];

const natures = [
  ["basic", "Basica", "Recurso esperado como requisito funcional essencial."],
  ["differential", "Diferencial", "Recurso que diferencia a solucao em relacao ao mercado."],
  ["innovative", "Inovadora", "Recurso com carater inovador ou estrategico."]
] as const;

const statuses = [
  ["completed", "Concluido", "Funcionalidade concluida ou disponivel."],
  ["in_development", "Em desenvolvimento", "Funcionalidade em desenvolvimento."],
  ["to_develop", "A desenvolver", "Funcionalidade planejada, ainda nao desenvolvida."],
  ["no_project", "Sem projeto", "Funcionalidade sem projeto definido."]
] as const;

const opinionTypes = [
  ["include", "Incluir", "Incluir nova especificacao.", true],
  ["keep", "Manter", "Manter especificacao existente.", false],
  ["improve", "Melhorar", "Melhorar especificacao existente.", true],
  ["remove", "Retirar", "Retirar especificacao existente.", true],
  ["replace", "Substituir", "Substituir especificacao existente.", true],
  ["other", "Outros", "Parecer parametrizavel para cenarios especificos.", true]
] as const;

const brazilianStates = [
  ["AC", "Acre", "Norte"],
  ["AL", "Alagoas", "Nordeste"],
  ["AP", "Amapá", "Norte"],
  ["AM", "Amazonas", "Norte"],
  ["BA", "Bahia", "Nordeste"],
  ["CE", "Ceará", "Nordeste"],
  ["DF", "Distrito Federal", "Centro-Oeste"],
  ["ES", "Espírito Santo", "Sudeste"],
  ["GO", "Goiás", "Centro-Oeste"],
  ["MA", "Maranhão", "Nordeste"],
  ["MT", "Mato Grosso", "Centro-Oeste"],
  ["MS", "Mato Grosso do Sul", "Centro-Oeste"],
  ["MG", "Minas Gerais", "Sudeste"],
  ["PA", "Pará", "Norte"],
  ["PB", "Paraíba", "Nordeste"],
  ["PR", "Paraná", "Sul"],
  ["PE", "Pernambuco", "Nordeste"],
  ["PI", "Piauí", "Nordeste"],
  ["RJ", "Rio de Janeiro", "Sudeste"],
  ["RN", "Rio Grande do Norte", "Nordeste"],
  ["RS", "Rio Grande do Sul", "Sul"],
  ["RO", "Rondônia", "Norte"],
  ["RR", "Roraima", "Norte"],
  ["SC", "Santa Catarina", "Sul"],
  ["SP", "São Paulo", "Sudeste"],
  ["SE", "Sergipe", "Nordeste"],
  ["TO", "Tocantins", "Norte"]
] as const;

async function main() {
  for (const [code, description] of permissions) {
    await prisma.permission.upsert({
      where: { code },
      update: { description },
      create: { code, description }
    });
  }

  for (const role of roles) {
    await prisma.role.upsert({
      where: { code: role.code },
      update: {
        name: role.name,
        description: role.description,
        permissions: {
          deleteMany: {},
          create: role.permissions.map((permissionCode) => ({
            permission: { connect: { code: permissionCode } }
          }))
        }
      },
      create: {
        code: role.code,
        name: role.name,
        description: role.description,
        permissions: {
          create: role.permissions.map((permissionCode) => ({
            permission: { connect: { code: permissionCode } }
          }))
        }
      }
    });
  }

  for (const [index, [code, name, description]] of natures.entries()) {
    await prisma.nature.upsert({
      where: { code },
      update: { name, description, sortOrder: index + 1, isActive: true },
      create: { code, name, description, sortOrder: index + 1 }
    });
  }

  for (const [index, [code, name, description]] of statuses.entries()) {
    await prisma.itemStatus.upsert({
      where: { code },
      update: { name, description, sortOrder: index + 1, isActive: true },
      create: { code, name, description, sortOrder: index + 1 }
    });
  }

  for (const [index, [code, name, description, requiresApproval]] of opinionTypes.entries()) {
    await prisma.opinionType.upsert({
      where: { code },
      update: { name, description, requiresApproval, sortOrder: index + 1, isActive: true },
      create: { code, name, description, requiresApproval, sortOrder: index + 1 }
    });
  }

  for (const [code, name, region] of brazilianStates) {
    await prisma.brazilianState.upsert({
      where: { code },
      update: { name, region, isActive: true },
      create: { code, name, region }
    });
  }

  const masterPassword = process.env.MASTER_USER_PASSWORD ?? "troque-esta-senha";
  const passwordHash = await bcrypt.hash(masterPassword, 12);
  const masterRole = await prisma.role.findUniqueOrThrow({ where: { code: "master_admin" } });

  await prisma.user.upsert({
    where: { login: process.env.MASTER_USER_LOGIN ?? "master" },
    update: {
      name: process.env.MASTER_USER_NAME ?? "Administrador Master",
      email: process.env.MASTER_USER_EMAIL ?? "master@souyess.local",
      passwordHash,
      canApprove: true,
      roles: {
        deleteMany: {},
        create: [{ role: { connect: { id: masterRole.id } } }]
      }
    },
    create: {
      name: process.env.MASTER_USER_NAME ?? "Administrador Master",
      email: process.env.MASTER_USER_EMAIL ?? "master@souyess.local",
      login: process.env.MASTER_USER_LOGIN ?? "master",
      passwordHash,
      canApprove: true,
      roles: {
        create: [{ role: { connect: { id: masterRole.id } } }]
      }
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
