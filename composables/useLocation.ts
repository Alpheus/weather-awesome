export default function () {
  return useState('location', () => {
    allowed: false,
    current: 'London, UK'
  });
}
