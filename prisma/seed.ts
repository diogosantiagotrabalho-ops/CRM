import bcrypt from 'bcryptjs';
import { PrismaClient, LeadStatus, OpportunityStage, ActivityType, ActivityStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const organization = await prisma.organization.create({
    data: {
      name: 'Acme CRM'
    }
  });

  const passwordHash = await bcrypt.hash('admin1234', 10);

  const admin = await prisma.user.create({
    data: {
      name: 'Admin CRM',
      email: 'admin@acmecrm.com',
      passwordHash,
      role: 'ADMIN',
      organizationId: organization.id
    }
  });

  const lead = await prisma.lead.create({
    data: {
      organizationId: organization.id,
      name: 'Maria Souza',
      email: 'maria@empresa.com',
      phone: '(11) 99999-9999',
      source: 'Inbound',
      status: LeadStatus.NEW,
      score: 75,
      ownerId: admin.id,
      createdById: admin.id,
      updatedById: admin.id
    }
  });

  const account = await prisma.account.create({
    data: {
      organizationId: organization.id,
      legalName: 'Empresa Exemplo LTDA',
      cnpj: '12.345.678/0001-90',
      segment: 'Tecnologia',
      size: '50-100',
      address: 'Av. Paulista, 1000 - São Paulo',
      ownerId: admin.id,
      createdById: admin.id,
      updatedById: admin.id
    }
  });

  const contact = await prisma.contact.create({
    data: {
      organizationId: organization.id,
      name: 'João Pereira',
      email: 'joao@empresa.com',
      phone: '(11) 98888-7777',
      role: 'Diretor Comercial',
      accountId: account.id,
      createdById: admin.id,
      updatedById: admin.id
    }
  });

  const opportunity = await prisma.opportunity.create({
    data: {
      organizationId: organization.id,
      name: 'Contrato anual CRM',
      accountId: account.id,
      stage: OpportunityStage.PROSPECT,
      value: 120000,
      probability: 30,
      ownerId: admin.id,
      source: 'Indicação',
      createdById: admin.id,
      updatedById: admin.id
    }
  });

  await prisma.activity.create({
    data: {
      organizationId: organization.id,
      type: ActivityType.MEETING,
      dueDate: new Date(Date.now() + 86400000),
      status: ActivityStatus.OPEN,
      description: 'Reunião de alinhamento com a diretoria',
      leadId: lead.id,
      contactId: contact.id,
      opportunityId: opportunity.id,
      ownerId: admin.id,
      createdById: admin.id,
      updatedById: admin.id
    }
  });
}

main()
  .catch(error => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
