export interface PDFData  {
    title : string ;
    description : string  ;
    images : string[] ;
}
export const mockData : PDFData = {
    title  : "Villa moderne avec vue sur la mer ",
    description : "Magnifique villa contemporaine située dans un quartier résidentiel exclusif ,Cette propriété exceptionnelle offre un design épuré et des finitions de haute qualité. Parfait pour ceux qui recherchent élégance et confort dans un cadre privilégié" ,
    images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
    ]
}
export const generateHTML = (data: PDFData): string => `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>${data.title}</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, Helvetica, Arial, sans-serif;
      background: #f5f6f7;
      padding: 40px;
      color: #1f2937;
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
      background: #ffffff;
      padding: 60px;
    }

    /* Header */
    .header {
      margin-bottom: 40px;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 24px;
    }

    .title {
      font-size: 34px;
      font-weight: 600;
      letter-spacing: -0.5px;
      line-height: 1.2;
    }

    /* Description */
    .description {
      font-size: 16px;
      line-height: 1.75;
      color: #4b5563;
      margin-bottom: 48px;
      text-align: justify;
    }

    /* Section */
    .section-title {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 24px;
      color: #111827;
      border-left: 4px solid #111827;
      padding-left: 12px;
    }

    /* Images */
    .images {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .image-item img {
      width: 100%;
      height: 360px;
      object-fit: cover;
      border-radius: 6px;
      display: block;
    }

    /* Footer (optional) */
    .footer {
      margin-top: 60px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      font-size: 12px;
      color: #9ca3af;
      text-align: center;
    }
  </style>
</head>

<body>
  <div class="container">

    <div class="header">
      <h1 class="title">${data.title}</h1>
    </div>

    <p class="description">
      ${data.description}
    </p>

    <div>
      <h2 class="section-title">Galerie</h2>

      <div class="images">
        ${data.images
    .map(
        (img) => `
            <div class="image-item">
              <img src="${img}" alt="Image propriété" />
            </div>
          `
    )
    .join("")}
      </div>
    </div>
  </div>
</body>
</html>
`;
