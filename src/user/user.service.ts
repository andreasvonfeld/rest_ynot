import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  private readonly prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(data: any) {
    return this.prisma.user.create({
      data: {
        prenom: data.prenom,
        nom: data.nom,
        pseudo: data.pseudo,
        email: data.email,
        mdp: data.mdp, // à remplacer par hash bcrypt après
        dateNaissance: data.dateNaissance ? new Date(data.dateNaissance) : null,
        localisation: data.localisation,
        avatarUrl: data.avatarUrl,
        bio: data.bio,
        role: data.role ?? 'USER',
      },
    });
  }

  async update(id: number, data: any) {
    return this.prisma.user.update({
      where: { id },
      data: {
        prenom: data.prenom,
        nom: data.nom,
        pseudo: data.pseudo,
        email: data.email,
        localisation: data.localisation,
        avatarUrl: data.avatarUrl,
        bio: data.bio,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
