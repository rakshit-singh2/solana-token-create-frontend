import { FC } from "react";
import dynamic from "next/dynamic";

//INTERNAL IMPORT
import { useNetworkConfiguration } from "../contexts/NetworkConfigurationProvider";
// import NetworkSwitcher from "./SVG/NetworkSwitcherSVG";

const NetworkSwitcher: FC = () => {
  const { networkConfiguration, setNetworkConfiguration } = useNetworkConfiguration();
  return (<>
    <input type="checkbox" id="checkbox" />
    <label className="switch">
      <select value={networkConfiguration} onChange={(e) => setNetworkConfiguration(e.target.value || "devnet")} className="select pl-5 pr-5 border-none bg-transparent outline-0">
        <option className="bg-gray-500" value="mainnet-beta">main</option>
        <option className="bg-gray-500" value="devnet">dev</option>
        <option className="bg-gray-500" value="testnet">test</option>
      </select>
    </label>
  </>);
};

export default dynamic(() => Promise.resolve(NetworkSwitcher), {
  ssr: false,
});