/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ['upr.ru'], // <- добавляем сюда домен внешнего изображения
  },
}

export default nextConfig