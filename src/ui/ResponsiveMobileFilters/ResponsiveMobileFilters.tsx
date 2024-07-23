import Filter from "@/components/Filter/Filter";
import useClickOutside from "@/hooks/useClickOutside";

function ResponsiveMobileFilters({ showMobileFilters, setShowMobileFilters }) {
  const ref = useClickOutside({ close: setShowMobileFilters, value: false });

  return (
    <div
      className={` fixed top-0 w-[100vw] backdrop-filter backdrop-blur-md h-screen bg-opacity-30 bg-black  ${
        !showMobileFilters ? "-left-[120vw]" : "left-0"
      } w-50rem z-50 duration-300 transition-all `}
    >
      <div ref={ref}>
        <Filter
          setShowMobileFilters={setShowMobileFilters}
          isScrollPassedFilterEl={true}
        />
      </div>
    </div>
  );
}

export default ResponsiveMobileFilters;
