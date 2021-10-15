from requests import get
from bs4 import BeautifulSoup
from fake_useragent import UserAgent
from flask import Flask, render_template

app = Flask(__name__)

# Test unit
CATEGORIES = ['Платья', 'Обувь', 'Куртки и пальто',
              'Трикотаж', 'Кардиганы и джемперы',
              'Свитшоты и Худи', 'Рубашки и блузки',
              'Топы', 'Аксессуары', 'Брюки', 'Джинсы',
              'Белье', 'Одежда для сна и отдыха',
              'Спортивная одежда', 'Базовые модели',
              'Носки и колготки', 'Пиджаки', 'Юбки',
              'Комбинезоны', 'Плавки и пляжная одежда',
              'Шорты', 'Одежда для беременных',
              'H&M+ Большие размеры', 'Модели для невысоких',
              'Средства по уходу, для макияжа и маникюра']

test_list = []


@app.route('/')
def hello_world():
    return render_template('index.html',
                           categories=CATEGORIES,
                           product_count=int(PAGE_SIZE),
                           test_list=test_list)


# For correct parsed image URL's
PROTOCOL = 'https:'

# Access to website
ua = UserAgent()
headers = {'User-Agent': str(ua.random)}

CATEGORY = 'muzhchiny/deals/3-for-2-socks.html'

# To get all items from current category
page_size_request = get('https://www2.hm.com/ru_ru/' + CATEGORY,
                        headers=headers)
PAGE_SIZE = BeautifulSoup(page_size_request.text, 'lxml') \
    .find(class_='load-more-heading')['data-total']

payload = {'page-size': PAGE_SIZE}
src = get('https://www2.hm.com/ru_ru/' + CATEGORY,
          headers=headers,
          params=payload)

if src.status_code == 200:
    soup = BeautifulSoup(src.text, 'html.parser')

    i = 0
    for item in soup.find_all('li', class_='product-item'):
        test_list.append((
            PROTOCOL + item.find(class_='item-image')['data-src'].replace('style', 'main'),
            item.find(class_='item-heading').a.string,
            item.find(class_='item-price').span.string
        ))
        # print(PROTOCOL + item.find(class_='item-image')['data-src'].replace('style', 'main'))
        # print(item.find(class_='item-heading').a.string)
        # print(item.find(class_='item-price').span.string)
        i += 1

    print('Item entity:', i)

else:
    print('Error')

if __name__ == '__main__':
    app.run(debug=True)
