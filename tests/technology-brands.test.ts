import { test, expect } from "bun:test";
import { technologyBrands } from "../src/data/technologyBrands";
import { technologyBrandMarks } from "../src/data/technologyBrandMarks";

test("retain the exact 22 partners, order, and external destinations", () => {
  expect(technologyBrands.map(({ name, website }) => ({ name, website }))).toEqual([
  {
    "name": "Savant",
    "website": "https://www.savant.com/"
  },
  {
    "name": "Lutron",
    "website": "https://www.lutron.com/us/en"
  },
  {
    "name": "URC",
    "website": "https://www.urc-automation.com/"
  },
  {
    "name": "RTI",
    "website": "https://www.rticontrol.com/"
  },
  {
    "name": "Crestron",
    "website": "https://www.crestron.com/"
  },
  {
    "name": "Sonos",
    "website": "https://www.sonos.com/en-us/home"
  },
  {
    "name": "Bose",
    "website": "https://www.bose.com/home"
  },
  {
    "name": "JBL Synthesis",
    "website": "https://www.jblsynthesis.com/"
  },
  {
    "name": "AVA Cinema",
    "website": "https://www.ava.com/"
  },
  {
    "name": "Ring",
    "website": "https://ring.com/us/en"
  },
  {
    "name": "Nest",
    "website": "https://nest.com/whats-happening/"
  },
  {
    "name": "ecobee",
    "website": "https://www.ecobee.com/en-us/newsroom/"
  },
  {
    "name": "Sony",
    "website": "https://www.sony.co.jp/en/"
  },
  {
    "name": "Samsung",
    "website": "https://www.samsung.com/us/"
  },
  {
    "name": "LG",
    "website": "https://www.lgcorp.com/about/ci/element"
  },
  {
    "name": "Epson",
    "website": "https://epson.com/usa"
  },
  {
    "name": "Denon",
    "website": "https://www.denon.com/en-us/"
  },
  {
    "name": "Marantz",
    "website": "https://www.marantz.com/en-us/"
  },
  {
    "name": "Ubiquiti",
    "website": "https://techspecs.ui.com/brand?tab=Ubiquiti"
  },
  {
    "name": "Cisco Meraki",
    "website": "https://documentation.meraki.com/"
  },
  {
    "name": "Ruckus",
    "website": "https://www.ruckusnetworks.com/"
  },
  {
    "name": "Aruba",
    "website": "https://developer.arubanetworks.com/central/docs"
  }
]);
});

test("every partner has its own transparent CDN mark", () => {
  const urls = technologyBrands.map(({ name }) => technologyBrandMarks[name]?.url);
  expect(urls.every((url) => url?.startsWith("/__l5e/assets-v1/") && url.endsWith("-transparent.png"))).toBe(true);
  expect(new Set(urls).size).toBe(22);
});
