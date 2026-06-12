# 🎨 Affinity Art Gallery — Sanat Galerisi ve Başyapıtlar Koleksiyonu

Affinity Art Gallery, dünya sanat tarihine yön vermiş en seçkin orijinal başyapıtları dijital ortamda estetik bir vizyonla sergileyen, dinamik asenkron yapısıyla modern bir "Sanat Mağazası" ve "CRUD Ödev Alanı Yönetimi" barındıran kapsamlı bir web yazılım projesidir.

Bu proje, asil bej ve mantar tonlarının hakim olduğu kurumsal, minimalist ve zamansız bir müze atmosferini responsive (mobil uyumlu) bir arayüz ile kullanıcıya sunar.

---

## 🔗 Canlı Önizleme & Dağıtım (Deployment)

Projenin canlı olarak çalışan ve test edilebilir durumdaki web adresine aşağıdaki bağlantıdan ulaşabilirsiniz:

👉 **[Affinity Art Gallery Canlı Demo](https://quiet-churros-8f1c26.netlify.app/)**

---

## ✨ Öne Çıkan Özellikler & Fonksiyonel Yapı

### 1. Statik Kategori Filtreleme (Orijinal Başyapıtlar)
* **Dinamik Kategori Ayrımı:** Ana sayfada yer alan ikonik sanat eserleri; **Rönesans, Barok, Ekspresyonizm, Realizm, Heykel** ve **Modern Sanat** gibi kategorilere ayrılmıştır.
* **CSS ve JS Geçiş Efektleri:** Filtre butonlarına tıklandığında, JavaScript DOM manipülasyonu ile eşleşmeyen kartlar akıcı bir animasyon (`scale` ve `opacity` geçişleri) eşliğinde gizlenir ve filtrelenen eserler listelenir.

### 2. Gelişmiş Asenkron API & CRUD Yönetim Alanı (Mağaza)
Projenin en dinamik kısmı olan "Modern Sanat Mağazası" alanı, harici bir REST API (**FakeStoreAPI**) ile entegre çalışırken, yüklenen yerel şaheserlerin veri simülasyonunu da tek potada eritir:
* **Veri Birleştirme (Asenkron Yapı):** `fetchApiData` fonksiyonu asenkron (`async/await`) mimariyle FakeStoreAPI üzerindeki ürünleri çeker. Bu veriler, yüklenmiş olan yerel şaheserler (Örn: *Guernica, Yıldızlı Gece, İnci Küpeli Kız, Çığlık, Atina Okulu vb.*) ile harmanlanarak tek bir listede birleştirilir.
* **Anlık Arama (Live Search):** Arama çubuğuna yazılan karakterler, hem API'den gelen ürünlerin hem de yerel sanat eserlerinin başlıklarında anlık olarak (`input` event dinleyicisiyle) filtreleme yapar.
* **Full CRUD Operasyonları:**
  * **Ekleme (Create):** Form üzerinden yeni bir sanat eseri adı, fiyatı ve görsel URL'si girilerek koleksiyona eklenebilir. Görsel URL'si girildiğinde **canlı önizleme** kutusu tetiklenir.
  * **Okuma (Read):** Yüklenen tüm veriler Bootstrap kart mimarisine uygun biçimde responsive olarak listelenir. API yüklenirken kullanıcı dostu bir yükleme ikonu (Spinner) devreye girer.
  * **Güncelleme (Update):** Listelenen herhangi bir eserin "Düzenle" butonuna tıklandığında, form otomatik olarak o eserin bilgileriyle dolar, sayfa pürüzsüzce forma kayar (`scrollIntoView`) ve buton "Değişiklikleri Kaydet" moduna geçer.
  * **Silme (Delete):** "Sil" butonuna tıklandığında ilgili eser listeden dinamik olarak kaldırılır.

### 3. Bilet / Rezervasyon Yönetimi
* Kullanıcıların müze ziyareti planlayabilmesi için tarih ve kişi sayısı odaklı interaktif bir bilet oluşturma alanı sunar.

---

## 🛠️ Kullanılan Teknolojiler

* **HTML5:** Anlamsal (semantic) etiket yapısı kullanılarak SEO ve erişilebilirlik standartlarına uygun mimari.
* **CSS3 & Bootstrap 5.3.2:** Tamamen esnek grid (ızgara) yapısı, özel kart tasarımları ve modern kurumsal renk paleti (Doğal bej `--bg-color: #e5d8c5`, asil koyu kahve `--text-dark: #2a241f`, mat beyaz `--white-soft: #fbfbfa`).
* **Google Fonts:** Tipografik kontrast oluşturması amacıyla gövde metinlerinde *Montserrat*, başlıklar ve sanatsal vurgularda *Cormorant Garamond* yazı tipleri kullanılmıştır.
* **Pure JavaScript (ES6+):** Harici kütüphane kullanılmadan yazılan asenkron veri transferleri (`fetch`, `async/await`), DOM manipülasyonları, form validasyonları ve olay işleyiciler (`Event Listeners`).

---

## 📂 Proje Klasör Yapısı

```text
├── index.html          # Projenin ana iskeleti ve arayüz bileşenleri
├── style.css           # Özelleştirilmiş müze teması, renk değişkenleri ve animasyonlar
├── app.js              # Filtreleme, Bilet Formu, Async API, Arama ve CRUD mantığı
├── README.md           # Proje detaylı dokümantasyonu
├── *.jpg / *.png       # Sanat eserlerine ait yüksek çözünürlüklü şaheser görselleri:
│                         (yıldızlıgece.jpg, inciküpelikiz.jpg, guernica.jpg, 
│                          çığlık.jpg, ademinyaradılışı.jpg, atinaokulu.jpg, 
│                          bellek.jpg, dalga.jpg, davut.jpg, düşünenadam.jpg, 
│                          gecedevriyesi.jpg, monalisa.jpg, öpücük.jpg, 
│                          sonakşamyemeği.jpg, venüsündoğuşu.jpg vb.)
