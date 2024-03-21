import { genreLists, languageLists } from "@/shared/constants/movie.constraints"
import { DiscoverMedia } from "@/shared/stores/reducer"
import { Accordion, MultiSelect, Radio, RangeSlider, Slider } from "@mantine/core"
import { range } from "lodash"

interface IDiscoverAccordion {
     searchParam: DiscoverMedia,
     setSearchParam: Function,
}
const DiscoverAccordion = (props: IDiscoverAccordion) => {

  const searchParam = props.searchParam
  const setSearchParam = props.setSearchParam
  const setForm = (key: string, value: any) => {
    setSearchParam({ ...searchParam, ...{ [key]: value } })
  }

  return (
    <Accordion classNames={{ item: "border-yellow-500 mb-4 rounded-lg border-solid border", control: "", content: "border-t border-t-solid border-t-yellow-500 p-6" }} multiple radius="xl" defaultValue={["filters"]}>
      {/* <Accordion.Item value="account">
        <Accordion.Control className="text-white hover:bg-opacity-5 hover:bg-yellow-500 font-bold text-xl">Account States</Accordion.Control>
        <Accordion.Panel className="text-gray-200">
          <Radio.Group
            classNames={{ label: "text-white mb-4" }}
            //   value={accountStatePayload}
            onChange={(val) => setForm("accountStatePayload", val)}
            name="accountStateCheck"
            label="Select your states"
            // description="This is anonymous"
            withAsterisk
          >
            <div className="flex flex-col gap-2">
              <Radio color="yellow" classNames={{ label: "text-white" }} value="all" label="All Movies" />
              <Radio color="yellow" classNames={{ label: "text-white" }} value="watchlist" label="Watchlist" />
              <Radio color="yellow" classNames={{ label: "text-white" }} value="watched" label="Watched" />
              <Radio color="yellow" classNames={{ label: "text-white" }} value="with_states" label="Have states" />
              <Radio color="yellow" classNames={{ label: "text-white" }} value="without_states" label="Not have states" />

            </div>
          </Radio.Group>
        </Accordion.Panel>
      </Accordion.Item> */}
      <Accordion.Item value="filters">
        <Accordion.Control className="text-white hover:bg-opacity-5 hover:bg-yellow-500 font-bold text-xl">Filters</Accordion.Control>
        <Accordion.Panel className="">
          <div className="flex flex-col gap-4 w-full divide-y divide-yellow-500">
            <div className="pt-2">
              <span className="font-extrabold text-white">Genres</span>
              <div className="mt-4">
                <MultiSelect
                  data={genreLists.map((g) => ({ value: g.id.toString(), label: g.name }))}
                  placeholder="Select genres"
                  searchable
                  classNames={{ label: "text-white" }}
                  label="With genres"
                  color="yellow"
                  onChange={(val) => setForm("with_genres", val.join(','))}
                  value={searchParam.with_genres?.split(',')}
                  nothingFound="Nothing found"
                />
              </div>
            </div>
                      
            {/* Language */}
            <div className="pt-2">
              <span className="font-extrabold text-white">Original Language</span>
              <div className="mt-4">
                <MultiSelect
                  data={languageLists.map((g) => ({ value: g.iso_639_1.toString(), label: g.english_name }))}
                  placeholder="Select original languages"
                  searchable
                  classNames={{ label: "text-white" }}
                  // label="Original language"
                  color="yellow"
                  onChange={(val) => setForm("with_original_language", val?.join('|'))}
                  value={searchParam?.with_original_language?.split('|')}
                  nothingFound="Nothing found"
                />
              </div>
            </div>
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}

export default DiscoverAccordion