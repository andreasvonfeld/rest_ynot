import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

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
  const hashedPassword = await bcrypt.hash(data.mdp, 10);

  const user = await this.prisma.user.create({
    data: {
      prenom: data.prenom,
      nom: data.nom,
      pseudo: data.pseudo,
      email: data.email,
      mdp: hashedPassword,  // 👈 HASH ICI
      dateNaissance: data.dateNaissance ? new Date(data.dateNaissance) : null,
      localisation: data.localisation,
      avatarUrl: data.avatarUrl,
      bio: data.bio,
      role: data.role ?? 'USER',
    },
  });

  // On ne renvoie pas le hash
  const { mdp, ...safeUser } = user;
  return safeUser;
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
    try {
      // si relations à supprimer avant (ex: posts, comments), supprimer d'abord :
      // await this.prisma.post.deleteMany({ where: { authorId: id } });

      const user = await this.prisma.user.delete({ where: { id } });
      return { message: 'User deleted', user };
    } catch (err: any) {
      // Prisma error codes:
      // P2025 -> Record to delete does not exist
      // P2003 -> Foreign key constraint failed on delete
      if (err.code === 'P2025') {
        throw new NotFoundException('User not found');
      }
      if (err.code === 'P2003') {
        throw new BadRequestException('Cannot delete user: related records exist. Remove relations or enable cascade.');
      }
      throw err;
    }
  }
}
