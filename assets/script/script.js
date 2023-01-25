var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var nameTag = document.querySelector('#fullname');
var postTag = document.querySelector('#post');
var btnTag = document.querySelector('.form-submit__btn');
var postsTag = document.querySelector('.posts');
var heartTag = document.querySelector('.heart');
var heart_Tag = document.querySelector('.heart1');
var heart_Tags = document.querySelector('.heart2');
var arr = JSON.parse(localStorage.getItem("twittList") || "[]");
var twittsList = __spreadArray([], arr, true);
var deleteByUUID = function (uuid) {
    twittsList = twittsList.filter(function (el) { return el.uuid !== uuid; });
    localStorage.setItem("twittList", JSON.stringify(twittsList));
    if (postsTag && postsTag.children) {
        Array.from(postsTag === null || postsTag === void 0 ? void 0 : postsTag.children).forEach(function (post) {
            if (post instanceof HTMLElement && uuid === post.dataset.id) {
                postsTag.removeChild(post);
            }
        });
    }
};
var renderPosts = function () {
    twittsList.forEach(function (_a) {
        var uuid = _a.uuid, user = _a.user, post = _a.post;
        var twittTag = document.createElement("div");
        var twittAvatarTag = document.createElement("div");
        var twittImgTag = document.createElement("img");
        var twittInfoTag = document.createElement("div");
        var twittNameTag = document.createElement("h2");
        var twittTextTag = document.createElement("p");
        var twittBtnTag = document.createElement("button");
        twittBtnTag.addEventListener("click", function () {
            deleteByUUID(uuid);
        });
        twittImgTag.src = "./assets/img/icon.jpeg";
        twittImgTag.alt = "no image";
        twittAvatarTag.className = "twitt__avatar";
        twittAvatarTag.appendChild(twittImgTag);
        twittNameTag.className = "twitt__name";
        twittNameTag.innerText = user;
        twittTextTag.className = "twitt__text";
        twittTextTag.innerText = post;
        twittInfoTag.className = "twitt__info";
        twittInfoTag.appendChild(twittNameTag);
        twittInfoTag.appendChild(twittTextTag);
        twittBtnTag.className = "twitt__delete";
        twittBtnTag.innerText = "x";
        twittTag.className = "twitt";
        twittTag.dataset.id = uuid;
        twittTag.appendChild(twittAvatarTag);
        twittTag.appendChild(twittInfoTag);
        twittTag.appendChild(twittBtnTag);
        postsTag === null || postsTag === void 0 ? void 0 : postsTag.appendChild(twittTag);
    });
};
if (btnTag != null) {
    btnTag.addEventListener('click', function (event) {
        event.preventDefault();
        if (nameTag != null && postTag != null) {
            var uuid = Date.now().toString(36) + Math.random().toString(36).substring(2);
            var twitt = {
                uuid: uuid,
                user: "",
                post: ""
            };
            twitt.user = nameTag.value;
            twitt.post = postTag.value;
            var user = twitt.user, post = twitt.post;
            if (user && post) {
                twittsList = __spreadArray(__spreadArray([], twittsList, true), [twitt], false);
                localStorage.setItem("twittList", JSON.stringify(twittsList));
                nameTag.value = "";
                postTag.value = "";
            }
        }
        if (postsTag) {
            postsTag.innerHTML = "";
        }
        renderPosts();
    });
}
if (heartTag != null) {
    heartTag.addEventListener('click', function () {
        heartTag.style.color = 'gold';
        heartTag.style.opacity = '1';
    });
}
if (heart_Tag != null) {
    heart_Tag.addEventListener('click', function () {
        heart_Tag.style.color = 'gold';
        heart_Tag.style.opacity = '1';
    });
}
if (heart_Tags != null) {
    heart_Tags.addEventListener('click', function () {
        heart_Tags.style.color = 'gold';
        heart_Tags.style.opacity = '1';
    });
}
renderPosts();
