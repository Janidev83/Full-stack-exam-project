# Csőidom webáruház

## Vízió

Olyan webáruház, mely könnyen kezelhető, felhasználóbarát felületével biztosítja ipari víz-, gáz- és nyomott csatorna-  rendszerekhez illetve különféle ipari vegyianyagok szállítására alkalmas rendszerek gyors, szakszerű kiépítéséhez szükséges teljes körű, legkorszerűbb technológiájú csőidomok gyors, hatékony kiszolgálását - 16 éve e szakmát űző, széleskörű tapasztalattal rendelkező szakember tanácsadásával, akár ingyenes helyszíni felmérés alapján a legjobb megoldás kiválasztásával! Vigyázat! - Csak olyan szakembereknek ajánlott, akik tisztelettel és alázattal viseltetnek a munkájuk iránt!

## Technikai követelmények:
- **Angular** -- *model-service-component architektúra*
- **Bootstrap, Bootstrap-icons, scss** -- reszponzivitás, design
- **NoSql - MongoDB** -- adatbázis
- **Nodejs - Express** -- saját API, Swagger dokumentációval
- **Jest** -- tesztkörnyezet
- Bizonyos oldalak csak belépés után elérhetők.
- ***Felhasználói szerepkört*** leíró User Story-k
- Dockerizálva van - konténerből futtatható.

## Alkalmazás telepítése
1. Klónozza a git repo-t a megfelelő mappába ---> terminálban: git clone https://github.com/Strukturavaltas-FullstackAPI-2023/fsapi-remek-assignment-Janidev83.git
2. 
    - Telepítse a szükséges softwareket
        - [VScode](https://code.visualstudio.com/download)
        - [NodeJS](https://nodejs.org/en/download)
        - [Docker](https://docs.docker.com/engine/install/)

## Alkalmazás indítása
- Indítsa el a Docker Desktop alkalmazást
- Nyissa meg a VScode-t
    - File tab -> Open Folder -> Ön mappája -> fsapi-remek-assignment-Janidev83
- **/backend** mappába belépni *cd pipe-fitting-webshop/backend* ---> terminálban: docker compose up -d
## Alkalmazás megnyitása
- [Csőidom Webshop](http://localhost:3000/)
## Swagger megnyitása
- [Swagger](http://localhost:3000/api-docs)
## Alkalmazás leállítása
- **/backend** mappába belépni *cd pipe-fitting-webshop/backend* ---> terminálban: docker compose down
## Alkalmazás indítása fejlesztéshez
- **backend**
    - **/backend** mappába belépni *cd pipe-fitting-webshop/backend* ---> terminálban: npm i
    - npm run start:nodemon
- **frontend**
    - **/frontend** mappába belépni *cd pipe-fitting-webshop/frontend* ---> terminálban: npm i
    - npm run start
## Alkalmazás megnyitása
- [Csőidom Webshop](http://localhost:4200/)
## Alkalmazás buildelése
- Ha fejlesztés során változtatás történt a frontend mappában, buildelje le
    -  **/frontend** mappába belépni *cd pipe-fitting-webshop/frontend*
    - npm run build

## Végpontok dokumentációja
### [Swagger](http://localhost:3000/api-docs)
- POST/login - felhasználó bejelentkezés
- POST/refresh - felhasználó access tokenjének frissítése
- POST/logout - felhasználó kijelentkezés
- POST/registration - új felhasználó adatbázisba mentése
- GET/customer - bejelentkezett felhasználó regisztrációs adatainak lekérése jelszó kivételével
- PUT/customer/customer_id - bejelentkezett felhasználó regisztrációs adatainak módosítása
- GET/product - aruház által forgalmazott termékek adatainak lekérése
- GET/order - bejelentkezett felhasználó által elküldött rendelések lekérése
- POST/order/customer_id - bejelentkezett felhasználó által összeállított rendelés elmentése az orders kollekcióba
- DELETE/order/order_id - bejelentkezett felhasználó által elküldött rendelések visszavonása, törlése

## Integrációs tesztek futtatása
-  **/backend** mappába belépni *cd pipe-fitting-webshop/backend* ---> npm i
- **/backend** mappába belépni *cd pipe-fitting-webshop/backend* ---> docker compose up -d
- npm run test:integration

## Egységtesztek futtatása
- Ha még nem tettük meg:
    - **/backend** mappába belépni *cd pipe-fitting-webshop/backend* ---> npm i
- Összes futtatása
    - npm run test:unit
- Egyes tesztek futtatása
    - npm run test:customer
    - npm run test:order
    - npm run test:product
    - npm run test:registration

## Összes teszt futtatása
- Ha még nem tettük meg:
    - **/backend** mappába belépni *cd pipe-fitting-webshop/backend* ---> npm i
- **/backend** mappába belépni *cd pipe-fitting-webshop/backend* ---> docker compose up -d
- npm run test

## Entitások
- **customer**
    - Felhasználó ill. ügyfél, aki regisztráció majd bejelentkezés után vásárolhat különböző termékeket.
    - Adatok tárolása
        - vezetéknév
        - keresztnév
        - szállítási cím
        - email
        - jelszó
        - rendelések azonosítói
- **product**
    - Árucikk, melyet a webáruház forgalmaz
    - Adatok tárolása
        - idomnév
        - gyártó
        - hegeszthetőségi technológia
        - ár
        - *szerveren tárolt* kép url-je
- **order**
    - Ügyfél által elküldött rendelés
    - Adatok tárolása
        - rendelés száma
        - leadás dátuma
        - szállítási cím
        - végösszeg
        - ügyfél azonosítója
- **token**
    - Bejelentkezett felhasználók refresh tokenei
    - Adatok tárolása
        - refresh token

## User Story-k
### Navbar
- Welcome gombra kattintással elnavigál a kezdőoldalra, ahol el tudja olvasni a csodálatos üdvözlő üzenetet
- Még nem bejelentkezett felhasználó a Login gombra kattintással elnavigál a bejelentkező oldalra
- A bejelentkezett felhasználó a Logout gombra kattintással elnavigál a kezdőoldalra
- A bejelentkezett felhasználó a Logout gombra kattintással kijelentkezik az alkalmazásból
- Még nem bejelentkezett felhasználó a Registration gombra kattintással elnavigál a regisztrációs oldalra
- A bejelentkezett felhasználó az Update Account gombra kattintással elnavigál az adatainak módosítására lehetőséget biztosító oldalra
- Products gombra kattintással elnavigál a termékeket megjelenítő oldalra
- A bejelentkezett felhasználó az Orders gombra kattintással elnavigál a leadott rendeléseit megjelenítő oldalra
- A bejelentkezett felhasználó a kosár ikon mellett szereplő számból meg tudja állapítani a rendelésre előkészített termékfajták számát
- A bejelentkezett felhasználó a kosár ikonra kattintva eljut az elküldendő rendelés részleteit tartalmazó weboldalra
### Login
- A felhasználó ezen az oldalon tud bejelentkezni az alkalmazásba, hogy vásárolni tudjon
- A felhasználó csak a regisztrációt követően tud bejelentkezni az alkalmazásba
- A felhasználónak meg kell adnia a már regisztrált e-mail címét
- A felhasználónak meg kell adnia a már regisztrált jelszavát
- A felhasználó a Login gombra kattintással tud bejelentkezni az alkalmazásba, hogy vásárolni tudjon
- Ha nem adott meg minden szükséges adatot, nem tud rákattintani a Login gombra, ezzel megakadályozva a hibás bejelentkezést
- Ha helytelen, nem regisztrált adatokat ad meg, nem engedi bejelentkezni az oldal, ezzel megakadályozva a hibás bejelentkezést
- Helytelen bejelentkezési kísérletet követően figyelmeztetés jelenik meg, tájékoztatva a problémáról a felhasználót, így tudja, mi a probléma oka
- Sikeres bejelentkezést követően elnavigál a főoldalra, hogy újra megtekinthesse a csodálatos üdvözlőoldalt
- Sikeres bejelentkezést követően ez az oldal nem lesz elérhető a bejelentkezett felhasználó számára, mert már nincs szüksége rá
- Kijelentkezést követően újra elérhetővé válik az oldal a kijelentkezett felhasználó számára, hogy újra be tudjon jelentkezni
### Registration
- Még nem regisztrált felhasználó regisztrálni tud az oldalon, hogy később be tudjon jelentkezni az alkalmazásba
- Az oldal csak a nem bejelentkezett felhasználók számára érhető el, mivel a bejelentkezés után feleslegessé válik az oldal
- A felhasználó számára csak akkor válik kattinthatóvá a Registration gomb, amikor minden adatot helyesen megadott, ezzel minden szükséges adatot megadva az alkalmazás számára
- Ha helytelen adatokat adott meg, figyelmeztetés jelenik meg, így értesítve a felhasználót, mi a probléma
- Ha már regisztrált adatot adott meg, figyelmeztetés jelenik meg, tajákoztatva a felhasználót a problémáról
- A felhasználó a Registration gombra kattintással tud regisztrálni az alkalmazásba
- Sikeres regisztrációt követően elnavigál a főoldalra, mert erre az oldalra később nincs szüksége az adott felhasználónak
- A bejelentkezett felhasználó számára elérhetetlen lesz az oldal, mivel már be van regisztrálva
### Update Account
- A bejelentkezett felhasználó módosítani tudja bármely adatát, ha úgy kívánja 
- A bejelentkezett felhasználó csak akkor tud az Update Account gombra kattintani, ha minden adat meg van adva, ezzel minden szükséges adatot megadva az alkalmazás számára
- A bejelentkezett felhasználó az Update Account gombra kattintással tudja módosítani az adatait, ezzel véglegesítve a módosításokat
- A bejelentkezett felhasználó az Update Account gombra kattintással a főoldalra navigál, hogy újra megtekinthesse a csodálatos üdvözlőoldalt
- Kijelentkezett, nem regisztrált felhasználó számára nem elérhető az oldal, mivel felesleges számára
### Products
- A nem bejelentkezett felhasználó is tud kedvére böngészni az oldalon, ezáltal könnyebben eldöntve, hogy szeretne-e regisztrálni az oldalra
- A bejelentkezett felhasználó tud kedvére böngészni az oldalon, információt szerezni, van-e olyan termék, melyre szüksége lehet
- A bejelentkezett felhasználó az Add to cart gombra kattintással hozzá tudja adni az összeállítás alatt lévő rendeléséhez a különböző tételeket, hogy később el tudja azokat küldeni
- A felhasználók az egyes lapozógombokra kattintással tud váltogatni a termékeket kínáló felületek között, hogy kedvükre böngészhessenek kényelmesen
## Orders
- A nem bejelentkezett felhasználó nem tudja elérni az oldalt, mivel csak bejelentkezett ügyfelek használhatják az oldalt
- A bejelentkezett felhasználó itt tudja megtekinteni a korábban elküldött, folyamatban lévő rendeléseit, ezáltal nyomon tudja követni, melyek nem lettek még teljesítve a webáruház részéről
- A bejelentkezett felhasználó az adott rendeléshez tartozó Delete gombra kattintással törölni tudja az egyes rendeléseket, ezzel visszavonva, ha esetleg meggondolja magát
## Cart
- A nem bejelentkezett felhasználó nem tudja elérni az oldalt, mivel csak bejelentkezett ügyfelek használhatják az oldalt
- A bejelentkezett felhasználó az általa kiválasztott különböző tételeket itt tudja megtekinteni, hogy át tudja nézni még egyszer, kihagyott-e valamit, amire szüksége lenne
- A bejelentkezett felhasználó az általa kiválasztott különböző tételeknek itt tudja a mennyiségét megadni, ezáltal véglegesítve az elküldendő rendelését
- A bejelentkezett felhasználó az utolsó tétel alatt tudja megtekinteni a rendelés végösszegét, ezáltal számolva a költségek súlyával
- A bejelentkezett felhasználó a Send Order gombra kattintással tudja elküldeni rendelését a webáruház felé
- A bejelentkezett felhasználó csak akkor tud a Send Order gombra kattintani, HA--------KIEGÉSZÍTENI? HA KÉSZ A LOGIKA JANIII!!!!!
- A bejelentkezett felhasználó a rendelés elkülését követően átnavigál a főoldalra, hogy újra megtekinthesse a csodálatos üdvözlőoldalt
## Footer
- A felhasználók megtekinthetik a leghasznosabb információkat a webáruházzal kapcsolatban, hogy gyorsan segítséget kaphassanak az építési területen váratlanul felmerülő problémákra
- A felhasználók gyorsan elérhetik a különféle közösségi felületeken keresztül a webáruházhoz köthető cikkeket, személyes véleményeket illetve érdekes videókat, ezzel megnövelve érdeklődésüket tevékenységünk felé



