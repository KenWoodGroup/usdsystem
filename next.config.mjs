/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ['upr.ru'], // <- добавляем сюда домен внешнего изображения
  },
}

export default nextConfig
