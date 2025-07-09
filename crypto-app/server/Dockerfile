FROM oven/bun:1.1

WORKDIR /app

COPY . .

RUN bun install

RUN bunx prisma generate --schema=prisma/schema.prisma

RUN echo '#!/bin/bash\n\
  set -e\n\
  \n\
  echo "🔄 Ожидание готовности PostgreSQL..."\n\
  \n\
  until bunx prisma db push --schema=prisma/schema.prisma --accept-data-loss 2>/dev/null; do\n\
  echo "⏳ PostgreSQL недоступен - ожидание..."\n\
  sleep 2\n\
  done\n\
  \n\
  echo "✅ PostgreSQL готов!"\n\
  echo "🚀 Запуск приложения..."\n\
  \n\
  exec "$@"' > /wait-for-db.sh && chmod +x /wait-for-db.sh


CMD ["/wait-for-db.sh", "bun", "run", "start"]