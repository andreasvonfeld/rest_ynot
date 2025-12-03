import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  async getAllUsers() {
    return prisma.user.findMany({
      include: {
        gamesCreated: true,
        participations: true,
      },
    });
  }

  async createUser(data: any) {
    const { prenom, nom, email, mdp, dateNaissance, localisation, role } = data;

    // tu pourrais ici ajouter une validation basique
    if (!email || !mdp) {
      throw new Error('Email et mot de passe requis');
    }

    // création dans la base
    return prisma.user.create({
      data: {
        prenom,
        nom,
        email,
        mdp, // pense à le hasher avant en vrai projet
        dateNaissance: dateNaissance ? new Date(dateNaissance) : undefined,
        localisation,
        role,
      },
    });
  }
}
