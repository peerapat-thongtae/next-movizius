const Loading = (props: any) => {
  return (
    <div className="overlay-content align-center">
      <div className="wrapper">
        <div className="pacmancontainer">
          <div className="pacman" />
          <div className="pacman pac2" />
          <h2 className="animate font-bold text-2xl">
            {props?.textLoading || "Loading..." }
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Loading