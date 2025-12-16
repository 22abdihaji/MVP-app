# Vaihe 2 – Perusrunko ja päätoiminnallisuudet

## ✅ Ympäristö

Projektissa käytetään pilvipalveluita:

- **Frontend** deployataan **Verceliin**
- **Backend** voidaan deployata **Railwayhin** (tai toimii paikallisesti kehityksessä)

---

## ✅ Backend

Taustajärjestelmä on rakennettu **NestJS:llä (Node.js)**.  
Käytetään **RESTful API**-arkkitehtuuria.

- CRUD-toiminnot tehty `Todo`-tietueille
- Prisma toimii ORM:nä PostgreSQL:n kanssa

🔗 Esimerkki:

```http
GET    /todos
POST   /todos   { "title": "string" }
DELETE /todos/:id
```

model Todo {
id Int @id @default(autoincrement())
title String
completed Boolean @default(false)
}
