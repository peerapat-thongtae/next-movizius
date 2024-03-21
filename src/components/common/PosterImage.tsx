import Link from 'next/link';
import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';

type IPosterImageProps = {
  image_path: any;
  url?: string;
};
const PosterImage = (props: IPosterImageProps) => {
  const [init, setInit] = useState<boolean>(true)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const onLoaded = () => {
    setIsLoaded(true)
  }
  return (
    // <img src={props.image_path ? `https://www.themoviedb.org/t/p/w500/${props.image_path}` : `/assets/images/image-not-found.png`} />
    <>
      <Link href={props.url || ''}>
        <LazyLoadImage
          alt={props.image_path}
          src={props.image_path ? `https://www.themoviedb.org/t/p/w500/${props.image_path}` : `/assets/images/image-not-found.png`}
          wrapperClassName={`${props.url && 'cursor-pointer'
          } h-full w-full rounded-lg transition duration-300 group-hover:scale-110`}
          className={`${props.url && 'cursor-pointer'
          } h-full w-full rounded-lg object-cover object-center transition duration-300 group-hover:scale-110`}
          onLoad={onLoaded}
          placeholderSrc={`https://www.themoviedb.org/t/p/w45/${props.image_path}`}
        />
      </Link>
    </>
    
    
  );
};

export default PosterImage;