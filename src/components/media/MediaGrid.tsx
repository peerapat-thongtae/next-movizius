import Loading from "../common/Loading";
import MediaCard from "./MediaCard"
import { Pagination } from '@mantine/core';

const MediaGrid = (props: any) => {
  const items = props.items || []
  const page = props.page || 1
  const isLoading = props.isLoading || false

  const setPage = (page: number) => {
    console.log('asas', page)
    props.setPage(page)
  }
  return (
    <div>
      {!isLoading ? 
        (
          <>
            <div className="grid grid-cols-5 gap-8 p-12">
              {
                items.length > 0 && items.map((movie: any, index: number) => {
                  return <MediaCard key={index} item={movie} media-type="movie" />
                })
              }
            </div>
            <div className='flex justify-center items-center w-full py-8'>
              <Pagination 
                classNames={ { control: 'text-white data-active:!bg-yellow-500 hover:!bg-white data-active:bg-yellow-500 data-active:text-black hover:text-black' }} 
                total={items.length} 
                value={page} 
                onChange={setPage}
                mt="sm" 
              />
            </div>
          </>
        )
        :
        <div className="flex items-center justify-center min-h-[76vh]">
          <Loading />
        </div>

      }
      
    </div>
  )
}

export default MediaGrid