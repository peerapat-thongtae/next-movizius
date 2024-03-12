// import PosterImage from "@/components/Shared/PosterImage";
import MediaCard from "@/components/media/MediaCard";
import Loading from "@/components/common/Loading";
import { Pagination, Tabs } from "@mantine/core";
import queryString from "query-string";
import { useEffect, useMemo, useState } from "react";
import { ImSpinner } from "react-icons/im";
import { useSearchParams } from 'next/navigation'
import { useSearch } from "@/shared/hooks/useMedia";
import MediaGrid from "@/components/media/MediaGrid";
import Head from "next/head";

const SearchMoviePage = () => {
  const searchParams = useSearchParams();

  const [searchString, setSearchString] = useState<string>(searchParams.get('name') as string)

  useEffect(() => {
    setSearchString(searchParams.get('name') as string)
    setPage(1)
  }, [searchParams])
  
  const [activeTab, setActiveTab] = useState<string | null>("movies");
  const dataQueryMovies = useSearch(searchString, 'movie')
  const { isLoading, medias, isError, setPage, page } = dataQueryMovies 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  //   const dataQueryTV = useQuery(['search_tv', page, searchString], async () => await MovieListService.search(searchString, page, "tv"));
  //   const dataQueryAnime = useQuery(['search_anime', page, searchString], async () => await MovieListService.search(searchString, page, "anime"));
  return (
    <div className="p-12">
      <Head>
        <title>Search : {searchString}</title>
      </Head>
      <div>
        <Tabs keepMounted={false} unstyled onTabChange={setActiveTab} classNames={{ root: 'flex', panel: '', tabIcon: '', tabsList: 'w-auto flex flex-col text-center text-white font-bold p-1 mx-4', tab: 'data-[active=true]:bg-pink-500 w-[20vw] h-[6vh] border-yellow-200 border-[0.5px] text-white py-4 cursor-pointer hover:bg-pink-500' }} value={activeTab}>
          <Tabs.List>
            <Tabs.Tab value="movies" >
              <div className="flex justify-between px-4">
                <div>Movies</div>
                <span className="">{!dataQueryMovies.isLoading ? dataQueryMovies.medias?.total_results?.toLocaleString() : <ImSpinner className="animate-spin" color="yellow" size={20} />}</span>
              </div>
            </Tabs.Tab>
            {/* <Tabs.Tab value="tv">
              <div className="flex justify-between px-4">
                <div>TV</div>
                <span className="">{ !dataQueryTV.isLoading ? dataQueryTV?.data?.total_results?.toLocaleString() : <ImSpinner className="animate-spin" color="yellow" size={20} />}</span>
              </div>
            </Tabs.Tab>
            <Tabs.Tab value="anime">
              <div className="flex justify-between px-4">
                <div>Anime</div>
                <span className="">{!dataQueryAnime.isLoading ? dataQueryAnime?.data?.total_results?.toLocaleString() : <ImSpinner className="animate-spin" color="yellow" size={20} />}</span>
              </div>
            </Tabs.Tab> */}
            {/* <Tabs.Tab value="person">
                <div className="flex justify-between px-4">
                  <div>Person</div>
                  <span className="">232</span>
                </div>
              </Tabs.Tab> */}
          </Tabs.List>

          <Tabs.Panel value="movies">
            <div className="px-4">
              <MediaGrid size="MEDIUM" gridCols={4} items={medias?.results} page={page} isLoading={isLoading} setPage={setPage} totalPages={medias?.total_pages} totalResults={medias?.total_results} />
            </div>
          </Tabs.Panel>

          {/* <Tabs.Panel value="tv">
            <div className="px-4">
              {dataQueryTV?.isLoading &&
                  <div className="min-h-[90vh] h-full flex items-center px-96 text-center content-center justify-center w-full">
                    <Loading />
                  </div>
              }
              { !dataQueryTV?.isLoading && !dataQueryTV?.isError && 
                  <>
                    <div className="grid grid-cols-4 w-full lg:grid-cols-3 gap-6">
                      {dataQueryTV?.data?.result?.map((movie: any) => {
                        return (
                          <div key={movie.id} className="min-h-[48vh] h-[48vh] lg:h-[54vh] lg:min-h-[54vh] w-[16vw] min-w-[16vw] px-1 my-2">
                            <MediaCard movie={movie} mediaType="tv" />
                          </div>
                        );
                      })}
                    </div>
                    <div className='py-16 w-full text-center'>
                      <Pagination
                        classNames={{ control: 'hover:text-black'}}
                        value={page}
                        onChange={setPage}
                        total={dataQueryTV?.data?.total_pages}
                        position="center"
                        styles={(theme) => ({
                          control: {
                            color: "white",
                            '&[data-active]': {
                              backgroundImage: theme.fn.gradient({ from: 'red', to: 'yellow' }),
                              border: 0,
                            },
                          },
                        })}
                      />
                    </div>
                  </>
              }
                
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="anime">
            <div className="px-4">
              {dataQueryTV?.isLoading &&
                  <div className="min-h-[90vh] h-full flex items-center px-96 text-center content-center justify-center w-full">
                    <Loading />
                  </div>
              }
              { !dataQueryAnime?.isLoading && !dataQueryAnime?.isError && 
                  <>
                    <div className="grid grid-cols-4 lg:grid-cols-3 gap-6">
                      {dataQueryAnime?.data?.result?.map((movie: any) => {
                        return (
                          <div key={movie.id} className="min-h-[48vh] h-[48vh] lg:h-[54vh] lg:min-h-[54vh] w-[16vw] min-w-[16vw] px-1 my-2">
                            <MediaCard movie={movie} mediaType="tv" />
                          </div>
                        );
                      })}
                    </div>
                    <div className='py-16 w-full text-center'>
                      <Pagination
                        classNames={{ control: 'hover:text-black'}}
                        value={page}
                        onChange={setPage}
                        total={dataQueryAnime?.data?.total_pages}
                        position="center"
                        styles={(theme) => ({
                          control: {
                            color: "white",
                            '&[data-active]': {
                              backgroundImage: theme.fn.gradient({ from: 'red', to: 'yellow' }),
                              border: 0,
                            },
                          },
                        })}
                      />
                    </div>
                  </>
              }
                
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="person">
            <div className="px-12">
                PERSON
            </div>
          </Tabs.Panel> */}
        </Tabs>
      </div>
    </div>
  );
}

export default SearchMoviePage;