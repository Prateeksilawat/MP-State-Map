import { MapContainer, TileLayer, GeoJSON, Marker } from "react-leaflet";
import formationData from "../data/mpDistricts.json";
import * as turf from "@turf/turf";
import { useEffect, useState } from "react";
import L from "leaflet";

const MPMap = ({ selectedYear }) => {
  const [geoData, setGeoData] = useState(null);

  // Load GeoJSON
  useEffect(() => {
    fetch("/mp_districts.geojson")
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error("GeoJSON load error:", err));
  }, []);

  if (!geoData) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading Map...
      </div>
    );
  }

  // Filter districts by selected year
  const filteredDistricts = formationData.districts.filter(
    (d) => Number(d.creation_year) === Number(selectedYear),
  );

  // console.log("Selected Year:", selectedYear);

  filteredDistricts.forEach((district) => {
    console.log(
      "District:",
      district.name,
      "| Created In:",
      district.creation_year,
    );
  });

  // Normalize helper (removes spaces + lowercase)
  const normalize = (str) => str?.toLowerCase().replace(/\s/g, "");

  return (
    <div className="flex-1">
      <MapContainer center={[23.5, 78.5]} zoom={7} className="h-screen w-full">
        {/* Dark Theme Tile */}
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

        {/* Highlight District Polygons */}
        <GeoJSON
          data={geoData}
          style={(feature) => {
            const districtName = feature.properties.dtname;

            const normalize = (name) => name?.toLowerCase().trim();

            const exists = formationData.districts.find(
              (d) =>
                normalize(d.name) === normalize(districtName) &&
                d.creation_year <= selectedYear,
            );
console.log(
  "GeoJSON:",
  districtName,
  "| Matched:",
  formationData.districts.find(
    (d) =>
      normalize(d.name) === normalize(districtName)
  )
);
            return {
              fillColor: exists ? "#2563eb" : "#e5e7eb",
              weight: 1,
              color: "white",
              fillOpacity: 0.7,
            };
          }}
          onEachFeature={(feature, layer) => {
            layer.bindPopup(`
      <strong>${feature.properties.dtname}</strong>
    `);
          }}
        />

        {/* Visible Labels on Map */}
        {geoData.features.map((feature, index) => {
          const match = filteredDistricts.find((d) => {
            const geoName = normalize(feature.properties.NAME_2);
            const formationName = normalize(d.name);

            return (
              formationName === geoName ||
              (geoName === "eastnimar" && formationName === "khandwa") ||
              (geoName === "westnimar" && formationName === "khargone")
            );
          });

          if (!match) return null;

          const center = turf.centroid(feature).geometry.coordinates;

          const labelIcon = L.divIcon({
            className: "",
            html: `
              <div class="flex flex-col items-center -translate-y-4">
                <div class="
                  bg-orange-500 
                  text-white 
                  px-3 
                  py-1 
                  rounded-lg 
                  text-xs 
                  font-semibold 
                  shadow-lg 
                  whitespace-nowrap
                ">
                  ${match.name} - ${match.creation_year}
                </div>
                <div class="w-2 h-2 bg-orange-500 rounded-full mt-1"></div>
              </div>
            `,
            iconSize: [140, 40],
            iconAnchor: [70, 35],
          });

          return (
            <Marker
              key={index}
              position={[center[1], center[0]]}
              icon={labelIcon}
            />
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MPMap;
