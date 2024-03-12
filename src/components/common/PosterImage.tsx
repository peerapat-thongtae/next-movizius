import Link from 'next/link';
import { FaSpinner } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';

type IPosterImageProps = {
  image_path: string;
  url?: string;
};
const PosterImage = (props: IPosterImageProps) => {
  return (
    // <img src={props.image_path ? `https://www.themoviedb.org/t/p/w500/${props.image_path}` : `/assets/images/image-not-found.png`} />
    <Link href={props.url || ''}>
      <LazyLoadImage
        alt={props.url}
        // wrapperClassName={`${ 
        //   props.url && 'cursor-pointer'
        // } rounded-lg object-cover transition duration-150 ease-in-out hover:opacity-75`}
        src={props.image_path ? `https://www.themoviedb.org/t/p/w500/${props.image_path}` : `/assets/images/image-not-found.png`}
        wrapperClassName={`${props.url && 'cursor-pointer'
        } h-full w-full rounded-lg object-cover object-center transition duration-300 group-hover:scale-110`}
        className={`${props.url && 'cursor-pointer'
        } h-full w-full rounded-lg object-cover object-center transition duration-300 group-hover:scale-110`}
        placeholder={<div className="flex justify-center items-center h-full w-full">
          <FaSpinner color='yellow' size={30} className='animate-spin' />
        </div>}
      />
      
    </Link>
    
  );
};

export default PosterImage;