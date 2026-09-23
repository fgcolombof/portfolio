# Usamos una imagen liviana y estable de Node
FROM node:20-alpine

# Definimos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos primero los archivos de dependencias para aprovechar la cache de Docker
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código del proyecto
COPY . .

# Exponemos el puerto por defecto de Vite / Create React App
EXPOSE 5173

# Arrancamos el servidor de desarrollo
CMD ["npm", "run", "dev"]