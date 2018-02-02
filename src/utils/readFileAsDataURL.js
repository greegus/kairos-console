export default function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => resolve(e.target.result)
    reader.readAsDataURL(file)
  })
}
