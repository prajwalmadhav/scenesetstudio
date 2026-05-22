import { cn } from '@/lib/utils'

function RevealImageListItem({ text, images }) {
  const container = 'absolute right-8 -top-1 z-40 h-20 w-16'
  const effect =
    'relative duration-500 delay-100 shadow-none group-hover:shadow-xl scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 group-hover:w-full group-hover:h-full w-16 h-16 overflow-hidden transition-all rounded-md'

  return (
    <div className="group relative h-fit w-fit overflow-visible py-8">
      <h1 className="text-7xl font-black text-foreground transition-all duration-500 group-hover:opacity-40">
        {text}
      </h1>
      <div className={container}>
        <div className={effect}>
          <img alt={images[1].alt} src={images[1].src} className="h-full w-full object-cover" />
        </div>
      </div>
      <div
        className={cn(
          container,
          'translate-x-0 translate-y-0 rotate-0 transition-all delay-150 duration-500 group-hover:translate-x-6 group-hover:translate-y-6 group-hover:rotate-12',
        )}
      >
        <div className={cn(effect, 'duration-200')}>
          <img alt={images[0].alt} src={images[0].src} className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  )
}

function RevealImageList() {
  const items = [
    {
      text: 'Branding',
      images: [
        {
          src: 'https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?w=200&auto=format&fit=crop&q=60',
          alt: 'Brand identity design',
        },
        {
          src: 'https://images.unsplash.com/photo-1567262439850-1d4dc1fefdd0?w=200&auto=format&fit=crop&q=60',
          alt: 'Brand strategy',
        },
      ],
    },
    {
      text: 'Video',
      images: [
        {
          src: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=200&auto=format&fit=crop&q=60',
          alt: 'Video production',
        },
        {
          src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=200&auto=format&fit=crop&q=60',
          alt: 'Cinematic video',
        },
      ],
    },
    {
      text: 'Web Design',
      images: [
        {
          src: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=200&auto=format&fit=crop&q=60',
          alt: 'Web design',
        },
        {
          src: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=200&auto=format&fit=crop&q=60',
          alt: 'UI design',
        },
      ],
    },
    {
      text: 'Paid Ads',
      images: [
        {
          src: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=200&auto=format&fit=crop&q=60',
          alt: 'Paid advertising',
        },
        {
          src: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=200&auto=format&fit=crop&q=60',
          alt: 'Ad campaigns',
        },
      ],
    },
    {
      text: 'Social',
      images: [
        {
          src: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200&auto=format&fit=crop&q=60',
          alt: 'Social media',
        },
        {
          src: 'https://images.unsplash.com/photo-1579869847514-7c1a19d2d2ad?w=200&auto=format&fit=crop&q=60',
          alt: 'Content creation',
        },
      ],
    },
  ]

  return (
    <div className="flex flex-col gap-1 rounded-sm bg-background px-8 py-4">
      <h3 className="text-sm font-black uppercase text-muted-foreground">Our services</h3>
      {items.map((item, index) => (
        <RevealImageListItem key={index} text={item.text} images={item.images} />
      ))}
    </div>
  )
}

export { RevealImageList }
