# OurWork Assets

Drop your images here. Name them to match the card indices:

  card-01.jpg  →  WAVE1_CARDS[0]  (Large, top-left area)
  card-02.jpg  →  WAVE1_CARDS[1]
  ...
  card-N.jpg   →  WAVE1_CARDS[N-1]

  wave2-01.jpg →  WAVE2_CARDS[0]
  ...

Supported formats: .jpg, .jpeg, .png, .webp, .avif

To apply an image to a card in OurWork.jsx, add a style prop:
  style={{ ..., backgroundImage: 'url(/assets/ourwork/card-01.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
