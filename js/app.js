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
      li.setAttribute("OnClick", `category(${categorie.category_id})`);
      li.innerText = categorie.category_name;

      categoryNavElement.appendChild(li);
    }
  }
};

// load news from category
const category = (id) => {
  loader(true);
  console.log(id);
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
                    <div class="col-md-3">
                      <img src="${
                        news.thumbnail_url
                      }" class="img-fluid rounded-start" alt="..." />
                    </div>
      
                    <!-- News body -->
                    <div class="col-md-9 p-2">
                      <div class="card-body">
                        <h5 class="card-title">${news.title}</h5>
                        <p class="card-text py-4">
                          ${news.details.slice(0, 320)}...
                        </p>
      
                        <!-- News footer info -->
                        <div
                          class="card-text d-flex justify-content-between align-items-center"
                        >
                          <!-- author -->
                          <div class="author d-flex justify-content-between">
                            <img
                              class="rounded-circle"
                              src="${news.author.img}"
                              alt="athor"
                            />
                            <div
                              class="card-text d-flex flex-column ps-2 justify-content-center"
                            >
                              <small class="text-muted">${
                                news.author.name
                              }</small>
                              <small class="text-muted">${
                                news.author.published_datee
                              }</small>
                            </div>
                          </div>
      
                          <!-- news watch -->
                          <div class="d-flex align-items-center">
                            <p class=""><i class="fa-duotone fa-eye"> </i></p>
                            <p class="fw-bold">
                              <span id="views" class="fw-bold"> ${
                                news.total_view ? news.total_view : " 0"
                              }</span>M
                            </p>
                          </div>
      
                          <!-- reating -->
                          <div
                            class="reat d-flex justify-content-center align-items-center"
                          >
                            <i class="fa-duotone fa-star"></i>
                            <i class="fa-duotone fa-star"></i>
                            <i class="fa-duotone fa-star"></i>
                            <i class="fa-duotone fa-star"></i>
                            <i class="fa-duotone fa-star-sharp-half"></i>
                          </div>
      
                          <!-- show more button -->
                          <button class="btn btn-light">
                            <i class="fa-duotone fa-arrow-right"></i>
                          </button>
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
