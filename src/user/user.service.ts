import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  // 🔥 On déclare explicitement la propriété ici
  private readonly prisma: PrismaService;

  // 🔥 Puis on l'initialise dans le constructeur
  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async create(data: any) {
    return this.prisma.user.create({
    data: {
      prenom: data.prenom,
      nom: data.nom,
      pseudo: data.pseudo,
      email: data.email,
      mdp: data.mdp,
      dateNaissance: data.dateNaissance ? new Date(data.dateNaissance) : null,
      localisation: data.localisation,
      avatarUrl: data.avatarUrl,
      bio: data.bio,
      role: data.role ?? 'USER',
    },
  });
  }

async findOne(id: number) {
  return this.prisma.user.findUnique({
    where: { id },
  });
}

  update(id: number, data: any) {
    return `Update user #${id}`;
  }

  remove(id: number) {
    return `Remove user #${id}`;
  }
}
