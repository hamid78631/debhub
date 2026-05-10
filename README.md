#  DevHub

> Projet d'apprentissage Node.js + React, full-stack de A à Z.

##  Structure


## Démarrage rapide



### Terminal 1 — Backend

```bash
cd backend
npm run dev    # serveur sur http://localhost:3001
```

```bash
cd frontend
npm install    # uniquement la première fois
npm run dev    # app sur http://localhost:5173
```

Ouvre ensuite http://localhost:5173 .





DevHub est une plateforme web communautaire dédiée aux développeurs, pensée comme un mélange entre Dev.to, GitHub et Discord. L'idée centrale est simple : offrir aux développeurs un espace unique où ils peuvent partager leurs connaissances, exposer leurs projets, échanger en temps réel avec d'autres devs, et construire leur identité professionnelle en ligne. Plutôt que d'être un blog isolé, un portfolio statique ou un chat séparé, DevHub combine ces trois dimensions dans une expérience cohérente.
Concrètement, un utilisateur s'inscrit (par email/mot de passe ou via son compte GitHub), crée son profil avec une bio, un avatar, ses liens sociaux et sa stack technique. À partir de là, il peut publier des articles techniques en Markdown (tutoriels, retours d'expérience, opinions) avec des tags, des images et un système de commentaires imbriqués. Il peut aussi présenter ses projets personnels avec une description, une stack, un lien GitHub et une preview — un peu comme une vitrine de portfolio. Les autres utilisateurs peuvent liker, commenter, suivre les auteurs qu'ils apprécient, et un feed personnalisé se construit automatiquement à partir des personnes suivies et des tags qui les intéressent.
La dimension temps réel est ce qui distingue DevHub d'un simple blog. Les utilisateurs peuvent discuter en messages privés entre eux et rejoindre des rooms thématiques par technologie (room #javascript, #devops, #ai, etc.) pour échanger en direct. Un système de notifications live prévient instantanément quand quelqu'un like un article, mentionne un user avec @username, répond à un commentaire ou commence à suivre quelqu'un — tout ça sans rafraîchir la page, grâce aux WebSockets.
En arrière-plan, plusieurs mécanismes automatisés font tourner la plateforme sans intervention humaine. Quand un utilisateur poste un lien externe dans un article, le serveur va scraper automatiquement la page pour en extraire le titre, la description et l'image de prévisualisation (à la manière des aperçus Twitter/Slack). Quand quelqu'un s'inscrit ou demande à réinitialiser son mot de passe, des emails transactionnels sont envoyés via une file de jobs pour ne jamais bloquer l'API. Chaque dimanche soir, une tâche planifiée envoie automatiquement à chaque utilisateur une newsletter personnalisée récapitulant les meilleurs articles de la semaine sur les sujets qui l'intéressent. Les images uploadées sont automatiquement redimensionnées et optimisées en plusieurs formats pour ne pas saturer la bande passante.
Côté infrastructure, DevHub utilise PostgreSQL comme base de données principale pour les données structurées (users, articles, projets, comments, likes, follows) avec Prisma comme ORM, MongoDB pour le feed d'activité où la souplesse du document NoSQL est plus adaptée, Redis pour le cache des données fréquemment lues, la gestion des sessions, le rate limiting et la couche pub/sub qui permet de scaler les WebSockets sur plusieurs serveurs. Une API REST documentée avec Swagger expose toutes les fonctionnalités, sécurisée par JWT avec refresh tokens, protégée par Helmet, CORS et rate-limiting, validée par Zod sur chaque entrée. Le tout est testé avec Jest et Supertest, conteneurisé avec Docker, et déployé via une pipeline GitHub Actions sur Railway (back-end), Vercel (front-end Next.js), Neon (PostgreSQL) et Upstash (Redis).
Au final, DevHub n'est pas un projet jouet : c'est une véritable application full-stack production-ready, avec une architecture qui ressemble à ce que tu trouverais dans une vraie startup. En le construisant phase par phase, tu auras manipulé l'event loop natif, les streams, les Promises avancées, les middlewares Express, deux paradigmes de bases de données, l'authentification moderne, le temps réel WebSocket, les jobs asynchrones, le scraping, le scheduling, les tests, la sécurité, le logging, le déploiement et le CI/CD. À la fin, tu sauras non seulement faire du Node, mais tu sauras architecturer une vraie application backend professionnelle — et tu auras un projet portfolio qui parle de lui-même.
