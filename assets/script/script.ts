const nameTag: HTMLInputElement | null = document.querySelector('#fullname')
const postTag: HTMLInputElement | null = document.querySelector('#post')
const btnTag: HTMLButtonElement | null = document.querySelector('.form-submit__btn')
const postsTag: HTMLDivElement | null = document.querySelector('.posts')
const heartTag: HTMLInputElement | null = document.querySelector('.heart')
const heart_Tag: HTMLInputElement | null = document.querySelector('.heart1')
const heart_Tags: HTMLInputElement | null = document.querySelector('.heart2')

type TwittType = {
  uuid: string,
  user: string,
  post: string,
}

const arr = JSON.parse(localStorage.getItem("twittList") || "[]")

let twittsList: TwittType[] = [...arr]

const deleteByUUID = (uuid: string): void => {
  twittsList = twittsList.filter((el) => el.uuid !== uuid)
  localStorage.setItem("twittList", JSON.stringify(twittsList))
  if (postsTag && postsTag.children) {
    Array.from(postsTag?.children).forEach((post: ChildNode) => {
      if (post instanceof HTMLElement && uuid === post.dataset.id) {
        postsTag.removeChild(post)
      }
    })
  }
}

const renderPosts = () => {
  twittsList.forEach(({ uuid, user, post }) => {

    const twittTag: HTMLDivElement = document.createElement("div")
    const twittAvatarTag: HTMLDivElement = document.createElement("div")
    const twittImgTag: HTMLImageElement = document.createElement("img")
    const twittInfoTag: HTMLDivElement = document.createElement("div")
    const twittNameTag: HTMLHeadingElement = document.createElement("h2")
    const twittTextTag: HTMLParagraphElement = document.createElement("p")
    const twittBtnTag: HTMLButtonElement = document.createElement("button")

    twittBtnTag.addEventListener("click", () => {
      deleteByUUID(uuid)
    })

    twittImgTag.src = "./assets/img/icon.jpeg"
    twittImgTag.alt = "no image"

    twittAvatarTag.className = "twitt__avatar"
    twittAvatarTag.appendChild(twittImgTag)

    twittNameTag.className = "twitt__name"
    twittNameTag.innerText = user

    twittTextTag.className = "twitt__text"
    twittTextTag.innerText = post

    twittInfoTag.className = "twitt__info"
    twittInfoTag.appendChild(twittNameTag)
    twittInfoTag.appendChild(twittTextTag)

    twittBtnTag.className = "twitt__delete"
    twittBtnTag.innerText = "x"


    twittTag.className = "twitt"
    twittTag.dataset.id = uuid
    twittTag.appendChild(twittAvatarTag)
    twittTag.appendChild(twittInfoTag)
    twittTag.appendChild(twittBtnTag)

    postsTag?.appendChild(twittTag)
  })

}

if (btnTag != null) {
  btnTag.addEventListener('click', (event: MouseEvent): void => {
    event.preventDefault()
    if (nameTag != null && postTag != null) {
      const uuid = Date.now().toString(36) + Math.random().toString(36).substring(2);

      const twitt: TwittType = {
        uuid,
        user: "",
        post: "",
      }

      twitt.user = nameTag.value
      twitt.post = postTag.value

      const { user, post } = twitt

      if (user && post) {
        twittsList = [...twittsList, twitt]
        localStorage.setItem("twittList", JSON.stringify(twittsList))
        nameTag.value = ""
        postTag.value = ""
      }
    }
    if (postsTag) {
      postsTag.innerHTML = ""
    }
    renderPosts()
  })
}

if (heartTag != null) {
  heartTag.addEventListener('click', () => {
    heartTag.style.color = 'gold'
    heartTag.style.opacity = '1'
  })
}
if (heart_Tag != null) {
  heart_Tag.addEventListener('click', () => {
    heart_Tag.style.color = 'gold'
    heart_Tag.style.opacity = '1'
  })
}
if (heart_Tags != null) {
  heart_Tags.addEventListener('click', () => {
    heart_Tags.style.color = 'gold'
    heart_Tags.style.opacity = '1'
  })
}

renderPosts()