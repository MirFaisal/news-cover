// load news category from api
const loadNewsCategory = async () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  try {
    const response = await fetch(url);
    const data = await response.json();

    loadData(data.data);
  } catch (error) {
    console.log(error);
  }
  function loadData(data) {
    //load data in to category section
    const categoryNavElement = document.getElementById("category-nav");

    for (const categorie of data.news_category) {
      // creating dinamic element
      const li = document.createElement("li");
      li.classList.add("nav-link");
      li.classList.add("pe-2");
      li.classList.add("mb-3");
      li.setAttribute("OnClick", `category(this, ${categorie.category_id})`);
      li.innerText = categorie.category_name;

      categoryNavElement.appendChild(li);
    }
  }
};

// load news from category
const category = (element, id) => {
  loader(true);

  const active = document.querySelector(".category-nav .active");
  // remove previous active class
  if (active && !element.classList.contains("active")) {
    active.classList.remove("active");
  }
  element.classList.add("active");

  //load news data from cetagory
  const url = `https://openapi.programming-hero.com/api/news/category/0${id} `;

  try {
    fetch(url)
      .then((response) => response.json())
      .then((data) => loaddata(data.data));
  } catch (error) {
    console.log(error);
  }

  function loaddata(data) {
    loader(false);

    data = data.sort((a, b) => b.total_view - a.total_view);

    const foundNews = document.getElementById("found-result");
    foundNews.innerText = data.length;

    const cardWrapperElement = document.getElementById("news-wrapper");
    cardWrapperElement.innerHTML = ``;
    if (data.length > 0) {
      const alartBox = document.getElementById("alartBox");
      alartBox.classList.add("d-none");

      for (news of data) {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.classList.add("mb-4");
        cardElement.classList.add("p-2");
        cardElement.innerHTML = `
                  <div class="row g-0">
                    <!-- news thumbnail -->
                    <div class="col-md-3 d-flex justify-content-center justify-content-lg-start">
                      <img src="${
                        news.thumbnail_url
                      }" class="img-fluid rounded-start" alt="..." />
                    </div>
      
                    <!-- News body -->
                    <div class="col-md-9 p-2">
                      <div class="card-body">
                        <h5 class="card-title fw-bold text-capitalize">${
                          news.title
                        }</h5>
                        <p class="card-text py-4" style="text-align:justify">
                          ${news.details.slice(0, 320)}...
                        </p>
      
                        <!-- News footer info -->
                        <div
                          class="card-text d-flex justify-content-between align-items-center flex-wrap"
                        >
                          <!-- author -->
                          <div class="author d-flex justify-content-lg-between justify-content-center flex-wrap pe-2 pb-2">
                            <img
                              class="rounded-circle"
                              src="${news.author.img}"
                              alt="athor"
                            />
                            <div
                              class="card-text d-flex flex-column ps-2 pe-sm-1 justify-content-center"
                            >
                              <small class="text-muted">
                              ${news.author.name}
                              </small>
                              <small class="text-muted text-center">
                              ${news.author.published_date.slice(0, 10)}</small>
                            </div>
                          </div>
      
                          <!-- news watch -->
                          <div class="d-flex align-items-center mx-auto pe-2 pb-2">
                            <p class=""><i class="fa-duotone fa-eye"> </i></p>
                            <p class="fw-bold">
                              <span id="views" class="fw-bold"> ${
                                news.total_view ? news.total_view : " 0"
                              }</span>M
                            </p>
                          </div>
      
                          <!-- reating -->
                          <div
                            class="reat d-flex justify-content-center align-items-center mx-auto pe-2 pb-2"
                          >
                            <i class="fa-duotone fa-star"></i>
                            <i class="fa-duotone fa-star"></i>
                            <i class="fa-duotone fa-star"></i>
                            <i class="fa-duotone fa-star"></i>
                            <i class="fa-duotone fa-star-sharp-half"></i>
                          </div>
      
                          <!-- show more button -->
                          <div class="d-flex justify-content-center mx-auto">
                          <button onClick="viweMore('${news._id}')" 
                          class="btn btn-light mt-2" 
                          data-bs-toggle="modal" data-bs-target="#viewMoreModal"
                          >
                            <i class="fa-duotone fa-arrow-right"></i>
                          </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  `;
        cardWrapperElement.appendChild(cardElement);
      }
    } else {
      alartBox.classList.remove("d-none");
    }
  }
};

// view More button event handelar
function viweMore(newsId) {
  // creating dynamic url
  const url = `https://openapi.programming-hero.com/api/news/${newsId}`;

  //load data for more news information
  const loadNewsInfo = async (url) => {
    const response = await fetch(url);
    const data = await response.json();

    loadDataInModal(data.data[0]);
  };

  //show data in to modal
  const loadDataInModal = (data) => {
    const viewMoreModalLabel = document.getElementById("viewMoreModalLabel");
    viewMoreModalLabel.innerText = data.title;
    const heroImage = document.getElementById("hero-image");
    heroImage.setAttribute("src", `${data.image_url}`);

    const newsTxet = document.getElementById("news-txet");
    newsTxet.innerText = data.details;
  };
  loadNewsInfo(url);
}

// loader function
const loader = (boolean) => {
  const loaderElement = document.getElementById("loader");

  if (boolean) {
    loaderElement.classList.remove("d-none");
  } else {
    loaderElement.classList.add("d-none");
  }
};
loadNewsCategory();
