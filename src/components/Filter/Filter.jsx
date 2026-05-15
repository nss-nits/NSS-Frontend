import React, { useState, useEffect, useRef } from "react";
import Cardimg from "../images/img1.jpg";
import { FaInstagram, FaCalendarAlt, FaTag, FaChevronDown } from "react-icons/fa";

const Filter = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [showEventDropdown, setShowEventDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const eventDropdownRef = useRef(null);
  const yearDropdownRef = useRef(null);
  const eventButtonRef = useRef(null);
  const yearButtonRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("https://nss-backend-az92.onrender.com/api/events");
        const data = await res.json();
        setEvents(data);
        setFilteredEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        eventDropdownRef.current &&
        !eventDropdownRef.current.contains(e.target) &&
        eventButtonRef.current &&
        !eventButtonRef.current.contains(e.target)
      ) setShowEventDropdown(false);

      if (
        yearDropdownRef.current &&
        !yearDropdownRef.current.contains(e.target) &&
        yearButtonRef.current &&
        !yearButtonRef.current.contains(e.target)
      ) setShowYearDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const truncateText = (text, maxLength = 60) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "…" : text;
  };

  const eventOptions = [
    "All Events",
    ...new Set(events.map((e) => e.event_type).filter(Boolean)),
  ];

  const yearOptions = [
    "All Years",
    ...new Set([
      ...events.map((e) => e.year?.toString()).filter(Boolean),
      "2026",
    ]),
  ].sort((a, b) => {
    if (a === "All Years") return -1;
    if (b === "All Years") return 1;
    return parseInt(b) - parseInt(a);
  });

  useEffect(() => {
    let result = events;
    if (selectedEvent && selectedEvent !== "All Events")
      result = result.filter((e) => e.event_type === selectedEvent);
    if (selectedYear && selectedYear !== "All Years")
      result = result.filter((e) => e.year?.toString() === selectedYear);
    setFilteredEvents(result);
  }, [selectedEvent, selectedYear, events]);

  const resetFilters = () => {
    setSelectedEvent("All Events");
    setSelectedYear("All Years");
    setFilteredEvents(events);
    setShowEventDropdown(false);
    setShowYearDropdown(false);
  };

  const getEventTypeColor = (type) => {
    const colors = {
      Workshop: "bg-purple-100 text-purple-800",
      Seminar: "bg-blue-100 text-blue-800",
      Camp: "bg-green-100 text-green-800",
      Drive: "bg-red-100 text-red-800",
      default: "bg-gray-100 text-gray-700",
    };
    return colors[type] || colors.default;
  };

  const isFiltered =
    (selectedEvent && selectedEvent !== "All Events") ||
    (selectedYear && selectedYear !== "All Years");

  const FilterOptions = ({ options, onSelect, selected }) => (
    <div className="py-1 max-h-56 overflow-y-auto">
      {options.map((option, i) => (
        <button
          key={i}
          onClick={() => {
            onSelect(option);
            setShowEventDropdown(false);
            setShowYearDropdown(false);
          }}
          className={`block w-full px-4 py-2 text-left text-sm transition-colors duration-100 hover:bg-gray-50 ${
            selected === option
              ? "text-blue-600 font-medium bg-blue-50"
              : "text-gray-700"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-5 md:p-10">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-1">
            Past Events Gallery
          </h1>
          <p className="text-gray-500 text-base">
            Explore our memorable moments and achievements
          </p>
        </div>

        {/* Slim Filter Bar */}
        <div className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 mb-8 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wide mr-1">
            Filter
          </span>

          {/* Event Type Pill */}
          <div className="relative" ref={eventButtonRef}>
            <button
              onClick={() => {
                setShowEventDropdown(!showEventDropdown);
                setShowYearDropdown(false);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm transition-colors duration-150 ${
                selectedEvent && selectedEvent !== "All Events"
                  ? "bg-blue-50 border-blue-400 text-blue-700"
                  : "border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-800"
              }`}
            >
              <FaTag className="text-xs opacity-60" />
              <span>{selectedEvent && selectedEvent !== "All Events" ? selectedEvent : "Event type"}</span>
              <FaChevronDown
                className={`text-xs opacity-50 transition-transform duration-200 ${
                  showEventDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {showEventDropdown && (
              <div
                ref={eventDropdownRef}
                className="absolute z-20 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-md min-w-[180px]"
              >
                <FilterOptions
                  options={eventOptions}
                  selected={selectedEvent}
                  onSelect={(val) => {
                    setSelectedEvent(val);
                    setShowEventDropdown(false);
                  }}
                />
              </div>
            )}
          </div>

          <div className="relative" ref={yearButtonRef}>
            <button
              onClick={() => {
                setShowYearDropdown(!showYearDropdown);
                setShowEventDropdown(false);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm transition-colors duration-150 ${
                selectedYear && selectedYear !== "All Years"
                  ? "bg-blue-50 border-blue-400 text-blue-700"
                  : "border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-800"
              }`}
            >
              <FaCalendarAlt className="text-xs opacity-60" />
              <span>{selectedYear && selectedYear !== "All Years" ? selectedYear : "Year"}</span>
              <FaChevronDown
                className={`text-xs opacity-50 transition-transform duration-200 ${
                  showYearDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {showYearDropdown && (
              <div
                ref={yearDropdownRef}
                className="absolute z-20 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-md min-w-[160px]"
              >
                <FilterOptions
                  options={yearOptions}
                  selected={selectedYear}
                  onSelect={(val) => {
                    setSelectedYear(val);
                    setShowYearDropdown(false);
                  }}
                />
              </div>
            )}
          </div>

          {/* Divider + Clear */}
          {isFiltered && (
            <>
              <span className="w-px h-4 bg-gray-200 mx-1" />
              <button
                onClick={resetFilters}
                className="text-xs text-gray-400 hover:text-gray-700 px-2 py-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                Clear all
              </button>
            </>
          )}

          {/* Count */}
          <span className="ml-auto text-xs text-gray-400">
            {filteredEvents.length}{" "}
            {filteredEvents.length === 1 ? "event" : "events"}
          </span>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-md transition-all duration-200 group"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden bg-gray-100">
                <img
                  src={event.imgUrl || Cardimg}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.src = Cardimg; }}
                />
                {event.event_type && (
                  <span className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-medium rounded-full ${getEventTypeColor(event.event_type)}`}>
                    {event.event_type}
                  </span>
                )}
                {event.instagramUrl && (
                  <a
                    href={event.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-gradient-to-tr hover:from-purple-600 hover:via-pink-600 hover:to-yellow-500 transition-all duration-300 group/ig"
                  >
                    <FaInstagram className="text-gray-600 text-sm group-hover/ig:text-white transition-colors duration-300" />
                  </a>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3
                  className="font-medium text-sm text-gray-800 mb-3 line-clamp-2 leading-snug"
                  title={event.title}
                >
                  {truncateText(event.title, 60)}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <FaCalendarAlt className="text-xs" />
                    <span>{event.year || "N/A"}</span>
                  </div>
                  {event.instagramUrl && (
                    <a
                      href={event.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-500 hover:text-pink-600 flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-pink-50 transition-colors duration-200"
                    >
                      <FaInstagram className="text-xs" />
                      <span>View post</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-16 bg-white border border-gray-200 rounded-xl mt-6">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No events found</h3>
            <p className="text-sm text-gray-400 mb-6">
              Try adjusting your filters to see more results
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
