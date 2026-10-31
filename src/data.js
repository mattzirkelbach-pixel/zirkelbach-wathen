/* ------------------------------------------------------------------
   Zirkelbach–Wathen family data
   Family account: the family tree compiled by Clayton (30 Oct 2026),
   drawn from the family folder (Cleo Wathen Zirkelbach's 1988 account,
   family charts, the law-enforcement list, the 2009 Zirkelbach and
   2006 Vogt registers, a 1999 Wathen family history).
   Records research: 31 Oct 2026, against published county histories,
   cemetery registers, the Evansville Police Department's own history
   and compiled genealogies. Every finding carries source numbers that
   point at the Sources list, and a confidence mark:
     record     - original record, or a transcription of one
     published  - a published county history or compiled genealogy
     unverified - a family-tree site, a search-result title, or tradition
     conflict   - sources disagree with the family account or each other
   Living relatives are listed by name only.
------------------------------------------------------------------- */

const LINES = {
  zirkelbach: { key: "z", name: "Zirkelbach", blurb: "German Catholic farmers. Andrew Zirkelbach came from the Bavarian Rhön as a boy, about 1837–40, with his parents, brother and sisters, and farmed 160 acres near St. James church on the Vanderburgh–Gibson county line. His wife, Katherine Lintzenich, came from the Prussian Rhineland, and her family farmed just down the road." },
  daily:      { key: "d", name: "Daily", blurb: "Irish Catholic farmers in Illinois. William Daily came from Queen's County about 1816–19 with almost nothing and built up about 1,000 acres near Ridgway. His granddaughter Carrie married Pete Zirkelbach." },
  wathen:     { key: "w", name: "Wathen", blurb: "An old Catholic family from Maryland by way of Kentucky. They moved from Uniontown, Kentucky, to Knight Township about 1884. Their line runs back to a man who landed in Maryland under indenture in 1670." },
  vogt:       { key: "v", name: "Vogt", blurb: "German farmers from Bavaria and Hesse-Darmstadt who came to Vanderburgh County in 1852 and settled in Knight Township, near the farm the Wathens later bought." }
};

const PEOPLE = [
  /* ---------------- Donald and Cleo ---------------- */
  { id: "donald", line: "zirkelbach", gen: 0, name: "Donald Henry Zirkelbach", label: "Donald H. Zirkelbach", dates: "1911–1997",
    born: "10 August 1911, Evansville", died: "16 November 1997, Evansville", buried: "Oak Hill Mausoleum, Evansville",
    role: "Evansville police, 1934–55; lieutenant from 1948",
    family: [
      "Pete and Carrie's only son, with five sisters. He served on the Evansville police from 1934 to 1955, joining the year his father died. He attended the police radio school in April 1935 and in 1948 was made one of two new special-duty lieutenants.",
      "He married Cleo Wathen on 5 April 1930. After leaving the police he worked for Wright Motors until 1978."
    ],
    found: [
      { k: "record", t: "The Evansville Police Department's own history dates his appointment to 14 June 1934, names him among the twelve officers who took the April 1935 radio school under chief radio operator Ray McConnell (the graduates were licensed as third-class radio operators), and for 1948 records that two new special-duty lieutenant posts were created in the chief's office to look into complaints made directly to the chief, and that Herman Hayes and Don Zirkelbach were the two men promoted.", s: [5] },
      { k: "record", t: "The radio he trained on was new: one-way receivers were tested in twelve cars in May 1931, a 50-watt transmitter went in at headquarters in 1934, two-way sets were field-tested in eleven cars on 8 January 1935 under the experimental call letters W9XEH, and on 21 May 1935 the department was linked to the state police network through the Jasper post.", s: [5] },
      { k: "record", t: "The same history says the Zirkelbachs are the only family in the department's history with more than three generations on the force.", s: [5] },
      { k: "published", t: "Wright Motors was Bob Wright Motors, Inc., a Pontiac and Cadillac dealer at 109 S.E. Third Street in the 1940s; a Willard Library photograph shows its used-car lot at Sixth and Walnut in the early 1950s.", s: [25, 26] },
      { k: "published", t: "The 1925 state police pension plan paid half pay after twenty years, which fits a 1934–55 career.", s: [5] },
      { k: "published", t: "His Find a Grave memorial confirms his death in Evansville on 16 November 1997 and burial at Oak Hill beside Cleo; their infant son Donald Jr. is also at Oak Hill.", s: [61] }
    ],
    parents: ["pete", "carrie"], spouse: "cleo", married: "5 April 1930",
    children: "Donald Jr. (born and died 3 November 1930), Jeryl Henry, Thomas Joseph, John Charles, James Eric and Donna Maria",
    siblings: "Dorothy (Dorothy Emilia), Eleanor (1905–1999, Mrs. Harold J. Grimmeissen), Bonita, Bernadine and Veronica (1916–2008, Mrs. Osha)"
  },
  { id: "cleo", line: "wathen", gen: 0, name: "Cleo Margaret Wathen", label: "Cleo M. Wathen", dates: "1911–2007",
    born: "21 July 1911", died: "24 February 2007", buried: "",
    role: "Family historian; Republic Aviation, Little Sisters of the Poor",
    family: [
      "Joseph and Bena's youngest, and the family historian. She graduated from Bosse High School in 1929 and from Lockyear Business College, worked in the employment office at Republic Aviation during the Second World War, and later was receptionist and secretary for the Little Sisters of the Poor.",
      "She wrote poetry and made greeting cards for family, friends and veterans. Her 1988 account of her father's life is the source for much of the Wathen story. She and Donald were married for 67 years."
    ],
    found: [
      { k: "published", t: "Bosse High School opened in 1924, so her class of 1929 was among its first. Lockyear began in 1893 as the Columbian Business College, took Melvin Lockyear's name about 1897, moved to 209 N.W. Fifth Street in 1911 and closed in April 1991.", s: [32, 43, 28] },
      { k: "published", t: "Republic Aviation's Evansville plant broke ground in April 1942 and built 6,242 P-47 Thunderbolts, about forty percent of all P-47s. It hired roughly 5,000 people, about forty percent of them women. The last P-47N was delivered in September 1945; the plant later passed to International Harvester and then Whirlpool.", s: [27] },
      { k: "published", t: "The Little Sisters of the Poor ran St. John's Home for the Aged at 1236 Lincoln Avenue in Knight Township from 1882 until the sisters withdrew on 31 October 2013.", s: [28, 29, 44] }
    ],
    parents: ["joseph", "bena"], spouse: "donald", married: "5 April 1930",
    children: "Donald Jr. (born and died 3 November 1930), Jeryl Henry, Thomas Joseph, John Charles, James Eric and Donna Maria",
    siblings: "Nadine (1897–1977), Joseph Lowell (1898–1971), Madison Bray (1902–1986), Elvis James (1906–1978) and Mildred Mae (1908–1955)"
  },

  /* ---------------- Their parents ---------------- */
  { id: "pete", line: "zirkelbach", gen: 1, name: "Peter Frank Zirkelbach", nick: "Pete", label: "Peter F. “Pete” Zirkelbach", dates: "1875–1934",
    born: "16 November 1875, near St. James", died: "17 February 1934, Evansville", buried: "St. Joseph Catholic Cemetery, Evansville",
    role: "Saloonkeeper at Third and Locust; Evansville police until his death",
    family: [
      "Grew up on his parents' farm near St. James. At about ten he went to Ridgway, Illinois, when much of the family moved to Gallatin County in 1884–85, and in 1900 he was living there with his brother Frank. He met Carrie Daily there and married her at Waltonboro, Gallatin County, on 27 May 1903.",
      "They were living in Evansville by 1905, and before Prohibition he ran a saloon at Third and Locust. He served on the Evansville police from 1920 until his death in 1934."
    ],
    found: [
      { k: "conflict", t: "The police department's own history dates his appointment to 22 October 1924, four years later than the family's 1920. Its line-of-duty list has no 1934 entry, consistent with a death off duty.", s: [5] },
      { k: "published", t: "The 1905 Memoirs of the Lower Ohio Valley lists him among his father's children as Peter, of Evansville, and its John Daily sketch names Carrie as the wife of Peter Zirkelbach of Evansville.", s: [1, 2] },
      { k: "published", t: "Waltonboro was the post-office name (1877–87) of the Irish Catholic Pond Settlement midway between Shawneetown and New Haven; the office reopened in 1890 as Doherty. The parish there was St. Patrick's, whose registers for 1842–1956 survive on microfilm, so the 1903 wedding was almost certainly at St. Patrick's rather than in Ridgway.", s: [6, 16, 49] },
      { k: "published", t: "His niece Celia Zirkelbach married Peter J. Valter near Ridgway in 1906, a reminder that his brothers were farming there when he met Carrie.", s: [15] },
      { k: "published", t: "Prohibition opened with a 1920 federal investigation of the Evansville police; the chief was convicted of conspiring to run whiskey from Henderson, Kentucky. A former saloonkeeper joined a department still under that cloud.", s: [5] },
      { k: "conflict", t: "His Find a Grave memorial heads with 16 November 1876, born in Evansville; the death-record transcription on the same page gives 16 November 1875 in Vanderburgh County, matching the family. The 1880 census age of 4 fits either.", s: [61] },
      { k: "published", t: "His memorial links his daughters Eleanor (Mrs. Harold Grimmeissen, 1905–1999) and Veronica (Mrs. Osha, 1916–2008), and names a daughter Dorothy Emilia.", s: [61] }
    ],
    parents: ["andrew", "katherine"], spouse: "carrie", married: "27 May 1903, Waltonboro (Pond Settlement), Gallatin County, Illinois",
    children: "Dorothy, Eleanor (Elnora), Bonita, Bernadine, Veronica and Donald; a 2009 family register says there were seven",
    siblings: "William J., Andrew, George, Frank, Lena, Regina, Mary M., Maggie (Teresia Margaret), Barbara, Mena, Mathias, Maria Catharina and Eva Christina"
  },
  { id: "carrie", line: "daily", gen: 1, name: "Carolyn Daily", nick: "Carrie", label: "Carolyn “Carrie” Daily", dates: "1877–1956",
    born: "26 November 1877, Pond Settlement near Ridgway, Illinois", died: "16 April 1956, Evansville", buried: "St. Joseph Catholic Cemetery, Evansville, near Pete",
    role: "One of a dozen children of a Pond Settlement farm",
    family: [
      "Grew up on her family's farm in the Pond Settlement near Ridgway, one of about a dozen children of John and Eleanora Daily. Late in life she lived in Evansville with her daughter Eleanor (Elnora) and her family."
    ],
    found: [
      { k: "published", t: "The 1905 sketch of her father names her as Carrie, wife of Peter Zirkelbach of Evansville. Her daughter Eleanor carries her grandmother Eleanora's name.", s: [1] },
      { k: "published", t: "The same sketch counts twelve births in the family, including a pair of twins who died in infancy, which matches the family's 'about a dozen'.", s: [1] },
      { k: "conflict", t: "Her Find a Grave memorial at St. Joseph Catholic Cemetery gives 1878–1958, against the family's 26 November 1877 – 16 April 1956. The cemetery office or her death certificate would settle it.", s: [61] }
    ],
    parents: ["john-daily", "eleanora"], spouse: "pete", married: "27 May 1903",
    siblings: "William, Henry (died 1898), Aaron (died at 23), Mary A. (Mrs. John Frey), John Jr. (married Eunice Harrelson), Sarah (Mrs. Leonard Frey), Thomas (a lawyer in Shawneetown) and Charles, plus three who died as babies"
  },
  { id: "joseph", line: "wathen", gen: 1, name: "Joseph Waller Wathen", label: "Joseph W. Wathen", dates: "1874–1970",
    born: "3 September 1874, Uniontown, Kentucky", died: "8 May 1970, Evansville", buried: "Park Lawn Cemetery, Evansville",
    role: "Farmer, 5801 Pollack Avenue, Knight Township",
    family: [
      "Born at Uniontown, in Union County, Kentucky. His mother died when he was small, and from age four he was raised by his aunt, Florence Waller Clements. About 1884 his father brought his three sons to Knight Township.",
      "Around 1900 he bought Madison Bray's 134-acre farm at 5801 Pollack Avenue, paying for it with his crops. He married Bena Vogt on 9 February 1896."
    ],
    found: [
      { k: "published", t: "The Wathen Anthology (1999) and Reliques of the Rives (1929) both carry him as a son of Thomas Raphael and Polly (Waller) Wathen living in Evansville; Reliques gives his birth year as 1873 against the family's 1874.", s: [10, 11] },
      { k: "published", t: "His mother's family is now better known: Polly was born 20 October 1851 in Union County, a daughter of Joseph Burwell Waller and Mary E. Harris.", s: [11] },
      { k: "published", t: "Park Lawn Cemetery was laid out on a former farm; its earliest date is 1923 and the entrance was built in 1936.", s: [28] },
      { k: "unverified", t: "Nothing on Madison Bray or the Pollack Avenue purchase turned up online. The Vanderburgh County deed index (Bray to Wathen, about 1900) would settle it.", s: [] }
    ],
    parents: ["thomas-r", "polly"], spouse: "bena", married: "9 February 1896",
    children: "Nadine (1897–1977), Joseph Lowell (1898–1971), Madison Bray (1902–1986), Elvis James (1906–1978), Mildred Mae (1908–1955) and Cleo Margaret (1911–2007)",
    siblings: "William (1870–1889) and George Frederick (1872–1967); the Wathen Anthology counts five children in all"
  },
  { id: "bena", line: "vogt", gen: 1, name: "Phoebe Vogt", nick: "Bena", label: "Phoebe “Bena” Vogt", dates: "1875–1961",
    born: "20 October 1875, Knight Township", died: "14 August 1961", buried: "Park Lawn Cemetery, Evansville",
    role: "Grew up on her father's farm in Knight Township",
    family: [
      "Grew up on her father's farm in Knight Township. She married Joseph Wathen on 9 February 1896."
    ],
    found: [
      { k: "record", t: "The 1899 plat book lists Charles Vogt's seven children as Henry, Birdie, Ella, Lizzie, Flora, Hattie and Hary. Birdie is almost certainly Bena, since a phoebe is a bird, and Hary a misprint for Mary.", s: [7] },
      { k: "record", t: "The same sketch says her parents were members of the Christian church, so the 1896 marriage joined a Catholic Wathen to a Protestant Vogt household.", s: [7] }
    ],
    parents: ["charles-vogt", "elizabeth-pfingston"], spouse: "joseph", married: "9 February 1896",
    siblings: "Mary Jane (1874–1942, Mrs. George Caze), Henry Charles “Bud” (1877–1968), Sallie Gertrude (1880–1883), Ella Maude (1882–1901), Elizabeth May “Lizzie” (1885–1967, Mrs. Andrew J. Knight), Flora Alice (1888–1965, Mrs. Ed Pfingston) and Hettie Barbara “Hattie” (1892–1977, Mrs. William P. O'Sullivan)"
  },

  /* ---------------- Grandparents ---------------- */
  { id: "andrew", line: "zirkelbach", gen: 2, name: "Andrew Zirkelbach", label: "Andrew Zirkelbach", dates: "1831–1917",
    born: "24 June 1831 (or 1827), Bavaria", died: "10 March 1917, Evansville", buried: "St. Joseph Catholic Cemetery, Evansville",
    role: "Farmed 160 acres near St. James for 35 years",
    family: [
      "Came to America with his parents around 1837–40. He and Katherine farmed the same 160 acres near St. James for about 35 years and raised about a dozen children. He was called one of the prominent Democrats in his neighborhood. Later he and Katherine lived for a time in Gallatin County, Illinois."
    ],
    found: [
      { k: "published", t: "The 1905 sketch of his son William J. gives his birth as 24 June 1827 in Bavaria, arrival at about ten, marriage in Vanderburgh County, thirty-five years on the same farm near St. James, Democratic politics, and children all raised Catholic. It prints Katherine's maiden name as 'Leutzhuick', a garble of Lintzenich.", s: [2] },
      { k: "conflict", t: "Birth year: the family and his death record say 1831; the 1905 book says 1827. Day and month agree, and the 1880 census age of 49 fits 1831.", s: [2, 61] },
      { k: "record", t: "His Indiana death record gives his birth as 24 June 1831 in Germany, settling the year in the family's favor, and his father as Andrew. He is buried in St. Joseph Catholic Cemetery, section 11, lot 221, grave 3, without a marker, beside Katherine.", s: [61] },
      { k: "published", t: "Find a Grave links seven of his children with their own memorials: Regina Ziegler (1856–1917), Margaret Ottman (1862–1945), Barbara Bauer (1864–1902), George J. (1868–1935), Frank Joseph (1873–1947), Peter F. (1876–1934) and Mary M. Kohl (1877–1962). William J. (1854–1940) and Andrew H. (1860–1955) lie at St. Joseph's, Ridgway.", s: [65] },
      { k: "record", t: "The 1880 census lists the household as A. (49), Mary K. (47), Andrew (20), Margaret (18), Anna B. (16), Christina (14), George (12), Frank (7), Peter (4) and Mage (2).", s: [61] },
      { k: "record", t: "St. James burial registers record two of his children who died young: Matthew, buried 24 February 1872, and an infant entered as 'Guilelman' (William or Wilhelmina), died 10 July 1871 at fifteen months.", s: [3] },
      { k: "record", t: "The 1850 census of Johnson Township, Gibson County, has no Zirkelbach household. The 1905 book says the family settled in Vanderburgh County, so the 1850 entry is probably just across the county line.", s: [42, 2] },
      { k: "published", t: "The hamlet of St. James lies a mile south of Haubstadt and a quarter mile north of the Vanderburgh line, a stop on the railroad. Mass was first said there in 1836, a log church was blessed in July 1847, and the brick church's cornerstone was laid on 25 July 1855.", s: [22] }
    ],
    parents: ["andrew-sr", "regina"], spouse: "katherine",
    children: "William J. (1854–1940, Ridgway; married Anna K. Wenzel), Regina (25 Dec 1856 – 5 Feb 1917; Mrs. Joseph Ziegler; seven children), Maria Catharina (born 1858), Andrew H. (1860–1955, Ridgway; married Theresa Schoeny, then Caroline Rexing), Margaret “Maggie” (1862–1945; Mrs. Joseph H. Ottman), Barbara (1864–1902; married George W. Wenzel, then Frank Bauer), Eva Christina (born 1866), George J. (1868–1935, Ridgway; married Vilena Beebe), Mena, Mathias (died 1872), Frank Joseph (1873–1947; married Ella Croghan in Gallatin County, 1895; died at Madison, Indiana), Peter Frank (1875–1934), Mary M. (1877–1962; Mrs. Stephen H. Kohl, of St. Louis) and an infant who died in 1871",
    siblings: "Anna Maria (married Valentine Pfister), Regina Barbara (married Henry Eberhard, 1846), Eva (married Jacob Meny, 1851), Margaret (married Francis W. J. Lintzenich, 1857; died 1858) and John A. (1836–1914)"
  },
  { id: "katherine", line: "zirkelbach", gen: 2, name: "Katherine Lintzenich", label: "Katherine Lintzenich", dates: "1834–1917",
    born: "24 February 1834, Germany (the Prussian Rhineland)", died: "4 March 1917, Evansville", buried: "St. Joseph Catholic Cemetery, Evansville, beside Andrew (section 11, lot 221, grave 4; no marker)",
    role: "Maria Catherina in the church records; married at St. Wendel",
    family: [
      "Came from Prussia with her parents about the same time as the Zirkelbachs. She and Andrew married at St. Wendel. Her Lintzenich relatives farmed just south of the Zirkelbach farm."
    ],
    found: [
      { k: "published", t: "Lintzenich is a place name: Linzenich is a village of Zülpich in the Rhineland, and that left-bank territory passed to Prussia in 1815, which is why the family remembered her as Prussian.", s: [21, 40] },
      { k: "published", t: "St. Wendel was founded by Marcus and Wendel Wassmer, Baden-born coopers who came by way of Toronto in 1837. About twenty families built a log church in Christmas week 1841, after Mass had been said in Martin Kohl's home. She and Andrew married in a parish barely a decade old.", s: [23] },
      { k: "record", t: "St. James registers list Lintzenich burials from 1858 to 1885, among them William J. Lintzenich (26 December 1831 – 10 March 1885), the men and children of the farm south of the Zirkelbachs.", s: [3] },
      { k: "record", t: "Her Indiana death record, as transcribed on her memorial, gives her as Mary Catherine, born 24 February 1834 in Germany, died 4 March 1917 in Evansville, daughter of Christian and Mary Lintzenich. She died six days before Andrew; they lie side by side in unmarked graves 3 and 4 of lot 221.", s: [61] }
    ],
    parents: ["lintzenich-parents"], spouse: "andrew"
  },
  { id: "john-daily", line: "daily", gen: 2, name: "John Daily", label: "John Daily", dates: "1839–1915",
    born: "9 June 1839, Pond Settlement, Gallatin County, Illinois", died: "1915", buried: "",
    role: "Farmed the Pond Settlement all his life",
    family: [
      "Born on his father's farm in Gallatin County. His first school was a log house with no floor. He started farming for himself at 19 and farmed in the Pond Settlement near Ridgway all his life."
    ],
    found: [
      { k: "published", t: "His biographical sketch in the 1905 Memoirs of the Lower Ohio Valley is the source of the family's account, nearly word for word. It adds that the first school's seats were split sassafras saplings on pegs, that the second school a mile and a half away had a puncheon floor and a teacher named Watkins, that he married the year after he began farming (about 1859), that he owned the home place and another eighty acres, and that he was a Democrat.", s: [1] },
      { k: "published", t: "By 1905 he was the only surviving child of his father's first marriage. He and his father were both bitten by the rabid dog that killed his stepmother, and neither took the disease.", s: [1] },
      { k: "published", t: "Goodspeed's 1887 county history names the Dalys among the founding Irish Catholic families of the Pond Settlement, with the Lawlers, Maloneys, McGuires, Murphys, Keanes, Walshes and Duffys. The settlement's first chapel went up about 1848–49 and a large frame church in 1879.", s: [6] },
      { k: "unverified", t: "Civil War service is unresolved. Goodspeed lists a James Dailey killed in Tennessee in 1864 and a John Dailey of Equality, first lieutenant in the 6th Illinois Cavalry, but Equality is a different settlement and the 1905 sketch mentions no service.", s: [6] }
    ],
    parents: ["william-daily", "sylvelia"], spouse: "eleanora", married: "about 1859",
    children: "William, Henry (died 1898), Aaron (died at 23), Mary A. (Mrs. John Frey), John Jr., Sarah (Mrs. Leonard Frey), Thomas, Carrie (1877–1956), Charles, twins who died in infancy and one more infant"
  },
  { id: "eleanora", line: "daily", gen: 2, name: "Eleanora Stout", label: "Eleanora Stout", dates: "1841–1912",
    born: "1841, near Mansfield, Ohio", died: "1912", buried: "",
    role: "Started out in a one-room house with 15 cleared acres",
    family: [
      "Born near Mansfield, Ohio, to William and Mary (Van Horn) Stout. She and John started out in a one-room house with 15 cleared acres and raised a large family."
    ],
    found: [
      { k: "published", t: "The 1905 sketch is the only source found for her: a one-room box-frame house with a kitchen, fifteen cleared acres, and twelve children.", s: [1] },
      { k: "unverified", t: "No Stout or Van Horn record from Richland County, Ohio, was reached. The 1850 census there and the 1860 census of Gallatin County are the next places to look.", s: [] }
    ],
    parents: ["william-stout", "mary-van-horn"], spouse: "john-daily", married: "about 1859"
  },
  { id: "thomas-r", line: "wathen", gen: 2, name: "Thomas Raphael Wathen", label: "Thomas Raphael Wathen", dates: "1846–1898",
    born: "27 December 1846, Union County, Kentucky", died: "22 December 1898, Evansville", buried: "St. Joseph Catholic Cemetery, Evansville",
    role: "Brought his three sons from Uniontown to Knight Township",
    family: [
      "Lived at Uniontown, Kentucky. After his wife died, he brought his three sons to Knight Township about 1884."
    ],
    found: [
      { k: "published", t: "The Wathen Anthology (1999) gives his birth as 27 December 1846 and his death as 22 December 1898 in Evansville, with burial at St. Joseph's Cemetery there, and places him in the line George, Thomas, Barton, John, John, back to the 1670 immigrant.", s: [10] },
      { k: "published", t: "Reliques of the Rives (1929) calls him a farmer of Union County, a son of George and Elizabeth (Cissel) Wathen, married about 1870 to Polly Gillum Waller.", s: [11] },
      { k: "published", t: "Webb's 1884 history of Kentucky Catholicism lists a Thomas Wathen among the earliest Catholic settlers of Union County, beside Elias and Wilfred Cissel, and notes that Wathens served on the lay committee that began St. Agnes church at Uniontown in 1860.", s: [12, 13] }
    ],
    parents: ["george-wathen", "elizabeth-cissell"], spouse: "polly", married: "about 1870",
    children: "William (1870–1889), George Frederick (1872–1967), Joseph Waller (1874–1970) and two more; the Wathen Anthology counts five"
  },
  { id: "polly", line: "wathen", gen: 2, name: "Polly Gillum Waller", label: "Polly G. Waller", dates: "1851–after 1880",
    born: "20 October 1851, Union County, Kentucky", died: "Young, after her fifth child", buried: "",
    role: "From a Virginia family",
    family: [
      "Came from a Virginia family. She died young, after her fifth child was born."
    ],
    found: [
      { k: "published", t: "Reliques of the Rives gives her birth as 20 October 1851 in Union County, a daughter of Joseph Burwell Waller and Mary E. Harris, and her marriage to Thomas Raphael Wathen about 1870.", s: [11] },
      { k: "conflict", t: "The Wathen Anthology says she died after 1880 in Evansville and lies with Thomas at St. Joseph's Cemetery there; the family remembers her dying at Uniontown before the move. Vanderburgh County death records (kept from 1882) or the cemetery office would settle which is right.", s: [10] }
    ],
    parents: ["joseph-waller", "mary-harris"], spouse: "thomas-r", married: "about 1870"
  },
  { id: "charles-vogt", line: "vogt", gen: 2, name: "Charles Vogt", label: "Charles Vogt", dates: "1850–1900",
    born: "10 January 1850, Hesse-Darmstadt", died: "17 April 1900", buried: "",
    role: "Farmer, constable, justice of the peace, road supervisor",
    family: [
      "Called Henry Charles in a 2006 family register. He came to Vanderburgh County with his parents in 1852, aged two, farmed in Knight Township, and served as road supervisor, justice of the peace and constable."
    ],
    found: [
      { k: "record", t: "His sketch in the 1899 Illustrated Plat Book of Vanderburgh and Warrick Counties, read from the page image, says he farmed in section 2 of Knight Township, was then road supervisor, had served one term as justice of the peace and two as constable, was an active Democrat, married Elizabeth Pfingston in 1873, and that he and his wife were members of the Christian church.", s: [7] },
      { k: "record", t: "Elliott's 1897 county history lists his commission as justice of the peace on 5 April 1886, in a batch of six commissioned the same day.", s: [8] },
      { k: "record", t: "The 1899 Knight Township plat shows no Vogt parcel in section 2; the land may have been rented, or still in his father's estate.", s: [7] },
      { k: "published", t: "Knight Township was organized on 10 September 1840 from the east end of Pigeon Township. By 1899 its northern sections were almost wholly in German hands.", s: [8, 7] }
    ],
    parents: ["john-philip-vogt", "hettie"], spouse: "elizabeth-pfingston", married: "3 April 1873",
    children: "Mary Jane (1874–1942), Phoebe “Bena” (1875–1961), Henry Charles “Bud” (1877–1968), Sallie Gertrude (1880–1883), Ella Maude (1882–1901), Elizabeth May (1885–1967), Flora Alice (1888–1965) and Hettie Barbara (1892–1977)",
    siblings: "Peter (born 1855), Elizabeth “Baetta” (born 1856, Mrs. Peter Cody, of Cherry County, Nebraska), Barbara (born 1857, Mrs. John Becker) and Frederich (born 1859)"
  },
  { id: "elizabeth-pfingston", line: "vogt", gen: 2, name: "Elizabeth Pfingston", label: "Elizabeth Pfingston", dates: "1855–1922",
    born: "1855", died: "1922", buried: "",
    role: "Married Charles Vogt on 3 April 1873; eight children",
    family: [
      "Married Charles on 3 April 1873. They had eight children; Sallie Gertrude died at two and Ella Maude at nineteen."
    ],
    found: [
      { k: "published", t: "A Henry Pfingston was among the 89 founding families of St. John's Evangelical Church in Evansville in 1850, and an August Pfingston's daughter married in Knight Township in 1877. Which household was Dietrich's remains to be worked out.", s: [8, 7] },
      { k: "unverified", t: "Nothing found settles whether her mother was a Grimm or a Graham. A Daniel Grimm was commissioned justice of the peace in the county in 1862, which shows the Grimm name locally and proves nothing more.", s: [8] }
    ],
    parents: ["dietrich", "mary-grimm"], spouse: "charles-vogt", married: "3 April 1873"
  },

  /* ---------------- The immigrants and earliest known ---------------- */
  { id: "andrew-sr", line: "zirkelbach", gen: 3, name: "Andrew Zirkelbach the elder", label: "Andrew Zirkelbach Sr.", dates: "1802–about 1870",
    born: "1802, Bavaria", died: "About 1870 (or about 1877)", buried: "St. James Cemetery, by family account",
    role: "A baker in Germany; farmed near St. James",
    family: [
      "Born in Bavaria in 1802, a baker. He and Regina married about 1820, came to America about 1840 with their children, and settled near St. James in Johnson Township, Gibson County. From a 2009 family register, not yet confirmed by original records."
    ],
    found: [
      { k: "published", t: "The 1905 sketch confirms the baker's trade, says he never practiced it in America, and has him farming until his death at seventy-five, which would put his death about 1877 rather than 1870.", s: [2] },
      { k: "unverified", t: "No stone or register entry for him appears in either St. James cemetery transcription. The statement that both he and Regina are buried there rests on the family register alone.", s: [3, 4] },
      { k: "published", t: "The surname is a place name. Zirkenbach, a hamlet of Fulda in Hesse recorded in the twelfth century as Cirkumbach, lies just across the border from the Bavarian Rhön where the family lived.", s: [20] },
      { k: "published", t: "About 575 to 680 people carry the name in the United States today, with Indiana and Illinois first, which is to say mostly this family.", s: [40] }
    ],
    spouse: "regina", married: "about 1820",
    children: "Andrew (born 1831 or 1827), John A. (1836–1914), Anna Maria, Regina Barbara, Eva and Margaret"
  },
  { id: "regina", line: "zirkelbach", gen: 3, name: "Regina Rachel Frederich", label: "Regina R. Frederich", dates: "1799–1886",
    born: "1799, Wegfurt, Lower Franconia", died: "16 May 1886", buried: "St. James Cemetery, Haubstadt",
    role: "Born under the prince-bishops of Würzburg",
    family: [
      "Born in Wegfurt, Bavaria. Some family trees call her Regina Otillia; the 1850 and 1880 censuses call her Rachel."
    ],
    found: [
      { k: "published", t: "Wegfurt is a Catholic village in the Brend valley on the old Bamberg–Fulda road, first recorded in 824, with a parish church of St. Peter and Paul built in 1601–07. In 1832 it had 81 houses and 423 people. It belongs to the town of Bischofsheim in der Rhön. When she was born it lay in the Prince-Bishopric of Würzburg; it became Bavarian for good in 1814.", s: [18, 19] },
      { k: "published", t: "The 1905 sketch says one of the elder couple lived to eighty-seven, which fits her dates of 1799–1886 exactly.", s: [2] },
      { k: "record", t: "A broken stone in the newer St. James cemetery reads '?egina O' Zirkelbach, which supports the Otillia middle name; the name recurs in her granddaughter Otilia “Tillie”.", s: [4] },
      { k: "published", t: "The family's habit of calling a Regina 'Rachel' in English shows again a generation later: the 1905 book lists Andrew's daughter as Rachel, and her grave as Regina Zirkelbach Ziegler.", s: [2, 34] }
    ],
    spouse: "andrew-sr", married: "about 1820"
  },
  { id: "lintzenich-parents", line: "zirkelbach", gen: 3, sub: "from Katherine's death record", name: "Christian and Mary Lintzenich", label: "Christian & Mary Lintzenich", dates: "",
    born: "Linzenich, Rhineland (Prussia)", died: "", buried: "",
    role: "Katherine's parents, named on her 1917 death record",
    family: [
      "Katherine's parents, who came from Prussia about 1840. Their names were not in the family account."
    ],
    found: [
      { k: "published", t: "Linzenich is a village of Zülpich in the Euskirchen district of the Rhineland, Prussian from 1815, and the surname is taken from it.", s: [21, 40] },
      { k: "record", t: "Katherine's 1917 Indiana death record names her father as Christian Lintzenich and her mother as Mary. A Christian Lintzenich is also among the St. James burials of 1869.", s: [61, 3] }
    ],
    children: "Katherine, and the Lintzenichs who farmed south of the Zirkelbach place"
  },
  { id: "william-daily", line: "daily", gen: 3, name: "William Daily", label: "William Daily", dates: "died 1858",
    born: "Queen's County (now Laois), Ireland", died: "1858, Gallatin County, Illinois", buried: "",
    role: "Arrived with $10; died owning about 1,000 acres",
    family: [
      "From Queen's County, Ireland, now County Laois, and a cousin of the Civil War general Michael K. Lawler. He came over about 1816–19, nine weeks on a sailing ship, and reached Gallatin County with about $10. He started as a hired hand near Shawneetown and owned about 1,000 acres when he died in 1858. He married three times."
    ],
    found: [
      { k: "published", t: "The 1905 sketch names his three wives: Sylvelia Cusick, mother of John and six others including two pairs of twins; Martha Huston, mother of Hannah, James, Samuel and an infant, who died of rabies after a mad dog's bite; and the widow Mary Luttrell, mother of one child and still living in White County at eighty in 1905.", s: [1] },
      { k: "published", t: "His first purchase was 120 acres about a mile from John's later home, and he was counted among the county's leading stock raisers.", s: [1] },
      { k: "published", t: "Shawneetown had a federal land office from 1814 and the state's first bank from 1816, and the salt works around Equality hired labor, which is how a man who landed with ten dollars could end with a thousand acres.", s: [46] },
      { k: "unverified", t: "The Lawler cousinship rests on the 1905 sketch alone. The general's parents, John Lawler and Elizabeth Kelly, left Monasterevin, on the Kildare border with Queen's County, about 1818, paused in Frederick County, Maryland, and reached Gallatin County in 1819; no Lawler source names a Daily in the party. If the cousinship ran through the Kellys, William's mother may have been a Kelly.", s: [17] },
      { k: "published", t: "Irish emigration surged in 1817 after the harvest failures of 1815–16 and the collapse of farm prices that followed Waterloo.", s: [38] }
    ],
    spouse: "sylvelia", spouseNote: "also Martha Huston and Mary Luttrell",
    children: "By Sylvelia Cusick: Thomas (died young), John and Mary (twins), Sarah and Margaret (twins), William and Joseph. By Martha Huston: Hannah, James, Samuel and an infant. By Mary Luttrell: one child"
  },
  { id: "sylvelia", sub: "first wife; John's mother", line: "daily", gen: 3, name: "Sylvelia Cusick", label: "Sylvelia Cusick", dates: "",
    born: "", died: "", buried: "",
    role: "William Daily's first wife and John's mother",
    family: [
      "William Daily's first wife and John's mother. Not in the family's account; named in the 1905 sketch of her son."
    ],
    found: [
      { k: "published", t: "Her children were Thomas (died young), the twins John and Mary (Mary died at twelve months), the twins Sarah and Margaret, William and Joseph. By 1905 John was the only one living.", s: [1] }
    ],
    spouse: "william-daily"
  },
  { id: "william-stout", sub: "of Ohio", line: "daily", gen: 3, name: "William Stout", label: "William Stout", dates: "",
    born: "Ohio", died: "", buried: "", role: "Of Richland County, Ohio",
    family: ["Eleanora's father, of Ohio, near Mansfield."],
    found: [{ k: "unverified", t: "Known only from the 1905 sketch of his son-in-law; no Richland County record was reached.", s: [1] }],
    spouse: "mary-van-horn"
  },
  { id: "mary-van-horn", sub: "of Ohio", line: "daily", gen: 3, name: "Mary Van Horn", label: "Mary Van Horn", dates: "",
    born: "", died: "", buried: "", role: "Of Richland County, Ohio",
    family: ["Eleanora's mother, of Ohio."],
    found: [{ k: "unverified", t: "Known only from the 1905 sketch; the Van Horns were an old New Jersey and Ohio family, but her own line has not been traced.", s: [1] }],
    spouse: "william-stout"
  },
  { id: "george-wathen", sub: "Union County, Ky.", line: "wathen", gen: 3, name: "George Wathen", label: "George Wathen", dates: "",
    born: "Union County, Kentucky", died: "", buried: "", role: "Fifth generation from the Maryland immigrant",
    family: ["Thomas Raphael's father."],
    found: [
      { k: "published", t: "Reliques of the Rives names George and Elizabeth (Cissel) Wathen as Thomas Raphael's parents; the Wathen Anthology numbers George as the fifth generation from John Wathen the immigrant.", s: [11, 10] },
      { k: "published", t: "Webb's 1884 history lists a Thomas Wathen and Elias and Wilfred Cissel among Union County's earliest Catholic settlers; most of the county's Catholics arrived after 1818, many by way of the older Maryland colonies around Bardstown.", s: [12, 13] }
    ],
    parents: ["thomas-ann"], spouse: "elizabeth-cissell"
  },
  { id: "elizabeth-cissell", sub: "a Maryland family", line: "wathen", gen: 3, name: "Elizabeth Cissell", label: "Elizabeth Cissell", dates: "",
    born: "", died: "", buried: "", role: "A Maryland Catholic family name",
    family: ["Thomas Raphael's mother. The Cissells were, like the Wathens, a Catholic family that came from Maryland to Kentucky."],
    found: [{ k: "published", t: "Reliques of the Rives spells the name Cissel. Elias and Wilfred Cissel appear among the first Catholic settlers of Union County in Webb's 1884 history.", s: [11, 12] }],
    spouse: "george-wathen"
  },
  { id: "joseph-waller", line: "wathen", gen: 3, name: "Joseph Burwell Waller", label: "Joseph B. Waller", dates: "born 1816",
    born: "23 August 1816", died: "", buried: "", role: "Married near Morganfield, Kentucky",
    family: ["Polly's father, born in 1816. The family chart spells his middle name Burnell."],
    found: [
      { k: "conflict", t: "Reliques of the Rives (1929) spells it Burwell, a Virginia surname, and gives his birth as 23 August 1816, the son of Aaron Waller and a wife from the Rives family born in Virginia in 1790. He married near Morganfield. His siblings were Mary Gillum (born 1813) and Thomas Small (born 1818).", s: [11] },
      { k: "published", t: "He married first a daughter of Benjamin and Innocent Ann (White) Harris and second, on 15 April 1861, Lydia Gough, so Polly lost her mother by about age ten. A son of the first marriage was Robert Aaron Waller, born 1845.", s: [11] }
    ],
    parents: ["aaron-waller"], spouse: "mary-harris"
  },
  { id: "mary-harris", line: "wathen", gen: 3, name: "Mary Elizabeth Harris", label: "Mary E. Harris", dates: "died before 1861",
    born: "", died: "Before 1861", buried: "", role: "Her father's name is the open question",
    family: ["Polly's mother. The family chart traces the Harrises back to Capt. Aaron Harris (1747–1809), a Revolutionary War officer, by family tradition."],
    found: [
      { k: "conflict", t: "Reliques of the Rives makes her a daughter of Benjamin and Innocent Ann (White) Harris. No Capt. Aaron Harris with the dates 1747–1809 turned up in any Revolutionary roster searched, and Aaron is the name of her father-in-law Aaron Waller and of a grandson, so two lines may have been run together.", s: [11] }
    ],
    parents: ["benjamin-harris"], spouse: "joseph-waller"
  },
  { id: "john-philip-vogt", line: "vogt", gen: 3, name: "John Philip Vogt", label: "John Philip Vogt", dates: "1815–1896 (or 1866)",
    born: "8 April 1815, Bavaria", died: "20 September 1896 (or 1866)", buried: "Oak Hill Cemetery, Evansville",
    role: "Came to Vanderburgh County in 1852",
    family: ["Born in Bavaria. He and Hettie married about 1848 and came to Vanderburgh County in 1852 with Charles. Both are buried at Oak Hill."],
    found: [
      { k: "conflict", t: "The 1899 plat book, read from the page, calls him Philip, says the family came in 1852, and gives his death as 20 September 1866 and Hettie's as 7 March 1860. The family has 1896 and 1861; day and month agree in both cases. The family's note that the book gives 1860 and 1866 as arrival years is a misreading: those are its death dates, and it agrees on 1852.", s: [7] },
      { k: "published", t: "The emigration wave that carried them was driven by repeated crop failures from 1846, especially potato rot, and peaked in 1854. Evansville's Germans mostly landed at New York or Baltimore and came on to the Ohio, others by New Orleans and the Mississippi.", s: [41, 39] },
      { k: "published", t: "Oak Hill was laid out from 1850 and took its first burial in February 1853, so a death in 1860 or 1866 would be among its early graves. The city keeps a searchable burial database that would settle both dates.", s: [31] }
    ],
    spouse: "hettie", married: "about 1848",
    children: "Charles (1850–1900), Peter (born 1855), Elizabeth “Baetta” (born 1856), Barbara (born 1857) and Frederich (born 1859); the 1899 sketch names only Charles, Barbara Becker and Mrs. Peter Cody"
  },
  { id: "hettie", line: "vogt", gen: 3, name: "Henrietta Stumpf", nick: "Hettie", label: "Hettie Stumpf", dates: "about 1823–1861 (or 1860)",
    born: "About 1823, Hesse-Darmstadt", died: "7 March 1861 (or 1860)", buried: "Oak Hill Cemetery, Evansville",
    role: "Nellie M. in the 1899 plat book",
    family: ["Born in Hesse-Darmstadt about 1823. A county biography calls her Nellie M."],
    found: [
      { k: "conflict", t: "The 1899 sketch names her Nellie M. Stumpf and dates her death 7 March 1860; the family has 1861. The census taken in June 1860 would show whether she was living.", s: [7] }
    ],
    spouse: "john-philip-vogt", married: "about 1848"
  },
  { id: "dietrich", sub: "also written Dedrick", line: "vogt", gen: 3, name: "Dietrich Pfingston", label: "Dietrich Pfingston", dates: "",
    born: "Germany", died: "", buried: "", role: "Also written Dedrick",
    family: ["Elizabeth's father. His German origin is unknown."],
    found: [{ k: "unverified", t: "Pfingsten, a North German name meaning Pentecost, usually marks a Whitsun birth or baptism. No household for Dietrich was reached; Henry and August Pfingston were in Evansville and Knight Township by the 1850s–70s.", s: [8, 7] }],
    spouse: "mary-grimm"
  },
  { id: "mary-grimm", sub: "surname uncertain", line: "vogt", gen: 3, name: "Mary Grimm or Graham", label: "Mary Grimm (or Graham)", dates: "",
    born: "", died: "", buried: "", role: "The charts and the 2006 register disagree",
    family: ["Elizabeth's mother. The family charts and the 2006 register disagree on her surname."],
    found: [{ k: "unverified", t: "No record found settles it. The 1873 Vanderburgh County marriage record of Elizabeth Pfingston and Charles Vogt, or Elizabeth's 1922 death certificate, should name her.", s: [] }],
    spouse: "dietrich"
  },

  /* ---------------- Deeper roots ---------------- */
  { id: "thomas-ann", sub: "first to Kentucky", line: "wathen", gen: 4, name: "Thomas Wathen and Ann Simms", label: "Thomas Wathen", dates: "",
    born: "Charles County, Maryland", died: "Union County, Kentucky", buried: "", role: "“First to Ky.” on the family chart",
    family: ["The family chart marks them 'first to Ky.' They moved from Charles County, Maryland, to Union County, Kentucky, before 1816, part of the movement of Catholic families from Maryland to Kentucky."],
    found: [
      { k: "published", t: "The Wathen Anthology numbers Thomas as the fourth generation: Thomas, son of Barton, son of John the younger, son of John the immigrant.", s: [10] },
      { k: "published", t: "Webb counts fewer than a dozen Catholic families in Union County before 1818 and says most who came by 1840 arrived from Washington, Marion and Nelson counties, the older Maryland colonies around Bardstown, so the move was probably made in two stages.", s: [12] },
      { k: "published", t: "The Maryland League of 1785: Basil Hayden led sixty Catholic families from Prince George's, Charles and St. Mary's counties overland to Pittsburgh, down the Ohio to Maysville and on to Pottinger's Creek. A log church rose there in 1790–92 and the Diocese of Bardstown was created in 1808.", s: [36, 12] }
    ],
    parents: ["barton"], children: "George Wathen"
  },
  { id: "barton", sub: "Charles County, Md.", line: "wathen", gen: 5, name: "Barton Wathen", label: "Barton Wathen", dates: "",
    born: "Charles County, Maryland", died: "", buried: "", role: "Third generation in Maryland",
    family: ["Third generation in the Wathen Anthology's numbering; a son of John Wathen the younger."],
    found: [{ k: "published", t: "Known here only from the Anthology's lineage line. The Charles County registers and the Wathen's Adventure volume cover this generation.", s: [10] }],
    parents: ["john2"]
  },
  { id: "john2", sub: "named in the 1705 will", line: "wathen", gen: 6, name: "John Wathen the younger", label: "John Wathen Jr.", dates: "",
    born: "Charles County, Maryland", died: "", buried: "", role: "Named in his father's 1705 will",
    family: ["Second generation; one of the eight children named in the immigrant's 1705 will."],
    found: [{ k: "published", t: "His brother Hudson is the ancestor of the Kentucky distilling Wathens, which makes the two Wathen lines cousins through the immigrant.", s: [10, 14] }],
    parents: ["john1"]
  },
  { id: "john1", line: "wathen", gen: 7, name: "John Wathen", label: "John Wathen", dates: "to Maryland 1670, died 1705",
    born: "England", died: "1705, Charles County, Maryland", buried: "", role: "Indentured servant, carpenter, landowner",
    family: ["Came to Maryland in the 1600s. A 1999 Wathen family history says he arrived in 1670 as an indentured servant and died in 1705."],
    found: [
      { k: "published", t: "He signed a three-year indenture to Hugh Thomas on 10 September 1670 and sailed from Bristol on the Francis and Mary; worked as a carpenter and wheelwright; claimed headright land in 1674; patented 200 acres at Port Tobacco in 1701 under the name Wathen's Adventure; held lots in Newport; and signed his will in Charles County on 28 February 1705, leaving an estate valued at £147. His children were John, Ignatius, James, Hudson, Henry, Judea, Jane and Ann.", s: [14] },
      { k: "published", t: "The genealogist who assembled this believes he was Catholic but found no record that proves it.", s: [14] }
    ]
  },
  { id: "aaron-waller", sub: "Virginia", line: "wathen", gen: 4, name: "Aaron Waller and a Rives wife", label: "Aaron Waller", dates: "",
    born: "Virginia", died: "", buried: "", role: "The Virginia Wallers",
    family: ["Joseph Burwell Waller's parents, from Virginia."],
    found: [{ k: "published", t: "Reliques of the Rives, a genealogy of the Virginia Rives family, carries the Waller–Wathen entries that give this line its Virginia origin; Aaron's wife was born in Virginia on 29 January 1790.", s: [11] }],
    children: "Mary Gillum (born 1813), Joseph Burwell (born 1816) and Thomas Small (born 1818)"
  },
  { id: "benjamin-harris", sub: "per Reliques of the Rives", line: "wathen", gen: 4, name: "Benjamin Harris and Innocent Ann White", label: "Benjamin Harris", dates: "",
    born: "", died: "", buried: "", role: "Mary Elizabeth Harris's parents, per Reliques of the Rives",
    family: ["Mary Elizabeth Harris's parents, as given by Reliques of the Rives. The family chart instead names Capt. Aaron Harris (1747–1809) as the Harris ancestor."],
    found: [{ k: "unverified", t: "Whether this household descends from the Capt. Aaron Harris of family tradition is unproven. The DAR and SAR patriot databases are the place to test it.", s: [11] }],
    children: "Mary Elizabeth Harris"
  },

  /* ---------------- The wider family ---------------- */
  { id: "john-a", line: "zirkelbach", gen: 2, side: true, name: "John A. Zirkelbach", label: "John A. Zirkelbach", dates: "1836–1914",
    born: "1836", died: "30 November 1914", buried: "St. James Cemetery, Haubstadt", role: "Andrew's younger brother; farmed near Staser",
    family: ["Andrew's younger brother, who farmed near Staser. His daughter Otilia “Tillie” married Louis Weis, whose cousin Louisa married George Rexing. Another daughter, Anna Regina, married Michael Kissel."],
    found: [{ k: "record", t: "The newer St. James cemetery records John Zirkelbach, died 30 November 1914 aged 77; his wife Maria O. Zirkelbach, 28 December 1841 – 24 November 1898; a son Anthony, died 8 April 1908 at thirty; and on the same lot Michael H. Kissel (1858–1925) and Anna R. Kissel (1864–1948).", s: [4, 34] }],
    parents: ["andrew-sr", "regina"]
  },
  { id: "margaret-lintzenich", line: "zirkelbach", gen: 2, side: true, name: "Margaret Zirkelbach Lintzenich", label: "Margaret Zirkelbach", dates: "died 1858",
    born: "", died: "1 November 1858", buried: "St. James Cemetery, Haubstadt", role: "Andrew's sister; married a Lintzenich in 1857",
    family: ["Andrew's sister, who married Francis W. J. Lintzenich in 1857 and died in 1858."],
    found: [
      { k: "record", t: "The St. James burial register records Margarita Linzenich, née Zirchelbach, wife of Wilhelm Joseph, died 1 November 1858, and her infant son Andrew, 10 February – 8 November 1858, who outlived her by a week.", s: [3] },
      { k: "unverified", t: "A Wilhelm Joseph Lintzenich and his wife Marie Butzel buried an infant in January 1860, so her widower may have remarried within the year.", s: [3] }
    ],
    parents: ["andrew-sr", "regina"]
  },
  { id: "regina-ziegler", line: "zirkelbach", gen: 1, side: true, name: "Regina Zirkelbach Ziegler", label: "Regina Zirkelbach Ziegler", dates: "1856–1917",
    born: "1856", died: "1917", buried: "", role: "Andrew's daughter; the Ziegler and Kunkle cousins",
    family: ["Andrew's daughter, who married Joseph Ziegler. Her children were Victor, Rose, Mamie, Amelia and Edward. Their descendants include the Kunkle family, who keep a family Bible with names and dates."],
    found: [{ k: "unverified", t: "A Find a Grave memorial titled 1856–1917 was located but not opened; she died the same year as her father. The 1905 book lists her as Rachel.", s: [34, 2] }],
    parents: ["andrew", "katherine"]
  },
  { id: "william-j", line: "zirkelbach", gen: 1, side: true, name: "William J. Zirkelbach", label: "William J. Zirkelbach", dates: "1854–1940",
    born: "14 November 1854, Vanderburgh County", died: "1940", buried: "Ridgway, Gallatin County, Illinois", role: "Andrew's eldest son; to Ridgway in 1885",
    family: ["Andrew's eldest son, who moved to Ridgway, Illinois, in 1885."],
    found: [{ k: "published", t: "His own sketch in the 1905 Memoirs is the source for the family's Zirkelbach account. He married Anna K. Wenzel of Vanderburgh County, moved to a farm near Ridgway in 1885, kept a store in town for a year, and in 1901 bought eighty acres three-quarters of a mile west of Ridgway, where he bred Aberdeen and Polled Angus cattle. His children were Andrew, George, Cecilia, Katherine, Josie, William M., Eleanora and Rudolph, and one who died in infancy.", s: [2] }],
    parents: ["andrew", "katherine"]
  },
  { id: "george-f-wathen", line: "wathen", gen: 1, side: true, name: "George Frederick Wathen", label: "George F. Wathen", dates: "1872–1967",
    born: "1872, Union County, Kentucky", died: "1967", buried: "", role: "Joseph's brother",
    family: ["Joseph's brother, one of the three sons brought to Knight Township about 1884."],
    found: [],
    parents: ["thomas-r", "polly"]
  },
  { id: "peter-vogt", line: "vogt", gen: 2, side: true, name: "Peter Vogt", label: "Peter Vogt", dates: "born 1855",
    born: "1855", died: "", buried: "", role: "Brewer in 1880; Evansville police, 1885–1926",
    family: ["Charles Vogt's brother, a brewer in Evansville in 1880, and possibly the Peter Vogt who joined the Evansville police in 1885."],
    found: [
      { k: "record", t: "The police department's history says that in 1925 Peter Vogt became the first officer in its history to complete forty years, retiring a year later with forty-one, which puts his appointment in 1885, among the first hires under the 1883 Metropolitan Police Act. Only four officers have reached forty years since. Whether this is the brewer born in 1855 is still unproven.", s: [5] },
      { k: "published", t: "A brewer in 1880 would most likely have worked at the City Brewery of Cook & Reis or the Fulton Avenue brewery of Ullmer & Hoedt.", s: [35] }
    ],
    parents: ["john-philip-vogt", "hettie"]
  },
  { id: "eleanor-g", line: "zirkelbach", gen: -1, side: true, name: "Eleanor Zirkelbach Grimmeissen", label: "Eleanor Zirkelbach", dates: "1905–1999",
    born: "23 April 1905, Vanderburgh County", died: "27 February 1999, Evansville", buried: "Oak Hill Cemetery, Evansville", role: "Donald's eldest sister; Carrie lived with her late in life",
    family: ["Pete and Carrie's daughter Eleanor (also written Elnora). Carrie lived with her and her family late in life."],
    found: [{ k: "published", t: "Her Find a Grave memorial gives her birth and death dates, burial at Oak Hill, and her husband, Harold Julius Grimmeissen (1893–1974).", s: [61] }],
    parents: ["pete", "carrie"] },
  { id: "veronica-o", line: "zirkelbach", gen: -1, side: true, name: "Veronica J. Zirkelbach Osha", label: "Veronica Zirkelbach", dates: "1916–2008",
    born: "1916", died: "2008", buried: "", role: "Donald's youngest sister",
    family: ["Pete and Carrie's daughter Veronica."],
    found: [{ k: "published", t: "Linked as Pete and Carrie's daughter on their Find a Grave memorials, with the married name Osha.", s: [61] }],
    parents: ["pete", "carrie"] },
  { id: "donald-jr", line: "zirkelbach", gen: -1, side: true, name: "Donald Zirkelbach Jr.", label: "Donald Jr.", dates: "1930",
    born: "3 November 1930", died: "3 November 1930", buried: "", role: "Donald and Cleo's first child",
    family: ["Donald and Cleo's first child, born and died on 3 November 1930."],
    found: [],
    parents: ["donald", "cleo"]
  },
  { id: "lawler", line: "daily", gen: 3, side: true, context: true, name: "Gen. Michael Kelly Lawler", label: "Gen. Michael K. Lawler", dates: "1814–1882",
    born: "16 November 1814, Monasterevin, County Kildare", died: "1882, near Equality, Illinois", buried: "", role: "Not an ancestor; William Daily's cousin, by the 1905 sketch",
    family: ["Not an ancestor. William Daily was said to be his cousin."],
    found: [{ k: "published", t: "Born to John Lawler and Elizabeth Kelly at Monasterevin, on the Kildare border with Queen's County. The family emigrated about 1818, paused in Maryland, came down the Ohio by flatboat and settled in Gallatin County in 1819. His father was remembered as the first Catholic in that part of Illinois, who bought land in the Pond, or Irish, Settlement and drew other Catholics to it. Michael married Elizabeth Crenshaw in 1837, led a dragoon company in Mexico, commanded the 18th Illinois Infantry in the Civil War, became a brigadier general and died in 1882; a monument to him was dedicated at Equality in 1913.", s: [17, 2, 6, 16] }]
  }
];

/* Couples and the pedigree. `up` gives the couple that each partner came from, in [a, b] order. */
const COUPLES = [
  { id: "dc", a: "donald", b: "cleo", gen: 0, up: ["pc", "jb"] },
  { id: "pc", a: "pete", b: "carrie", gen: 1, up: ["ak", "je"] },
  { id: "jb", a: "joseph", b: "bena", gen: 1, up: ["tp", "ce"] },
  { id: "ak", a: "andrew", b: "katherine", gen: 2, up: ["ar", "lp"] },
  { id: "je", a: "john-daily", b: "eleanora", gen: 2, up: ["ws", "sm"] },
  { id: "tp", a: "thomas-r", b: "polly", gen: 2, up: ["ge", "jm"] },
  { id: "ce", a: "charles-vogt", b: "elizabeth-pfingston", gen: 2, up: ["jh", "dm"] },
  { id: "ar", a: "andrew-sr", b: "regina", gen: 3 },
  { id: "lp", a: "lintzenich-parents", gen: 3 },
  { id: "ws", a: "william-daily", b: "sylvelia", gen: 3 },
  { id: "sm", a: "william-stout", b: "mary-van-horn", gen: 3 },
  { id: "ge", a: "george-wathen", b: "elizabeth-cissell", gen: 3, up: ["ta", null] },
  { id: "jm", a: "joseph-waller", b: "mary-harris", gen: 3, up: ["aw", "bh"] },
  { id: "jh", a: "john-philip-vogt", b: "hettie", gen: 3 },
  { id: "dm", a: "dietrich", b: "mary-grimm", gen: 3 },
  { id: "ta", a: "thomas-ann", bLabel: "Ann Simms", bSub: "", gen: 4, up: ["ba", null] },
  { id: "aw", a: "aaron-waller", bLabel: "a Rives wife", bSub: "born in Virginia, 1790", gen: 4 },
  { id: "bh", a: "benjamin-harris", bLabel: "Innocent Ann White", bSub: "", gen: 4 },
  { id: "ba", a: "barton", gen: 5, up: ["j2", null], chain: true },
  { id: "j2", a: "john2", gen: 6, up: ["j1", null], chain: true },
  { id: "j1", a: "john1", gen: 7, chain: true }
];

const CHILDREN_ROW = "Donald Jr. (1930), Jeryl, Tom, John, Eric and Donna";

/* ---------------- Timeline ---------------- */
const EVENTS = [
  { y: "1670", line: "wathen", t: "John Wathen signs a three-year indenture in Bristol and sails for Maryland on the Francis and Mary.", s: [14], n: true },
  { y: "1701", line: "wathen", t: "He patents 200 acres at Port Tobacco, Charles County, and names the tract Wathen's Adventure.", s: [14], n: true },
  { y: "1705", line: "wathen", t: "John Wathen's will, signed 28 February, names his wife Ann and eight children, among them John and Hudson.", s: [14] },
  { y: "1785", line: "wathen", t: "The Maryland League: sixty Catholic families leave southern Maryland for Pottinger's Creek, Kentucky.", s: [36] },
  { y: "1799", line: "zirkelbach", t: "Regina Frederich is born at Wegfurt in the Rhön, then under the prince-bishops of Würzburg.", s: [18] },
  { y: "1802", line: "zirkelbach", t: "Andrew Zirkelbach the elder is born in Bavaria. He will train as a baker.", s: [2] },
  { y: "1811", line: "wathen", t: "Union County, Kentucky, is organized from Henderson County.", s: [12] },
  { y: "1814", line: "daily", t: "Michael Kelly Lawler is born at Monasterevin, on the Kildare border with Queen's County.", s: [17] },
  { y: "1815", line: "vogt", t: "John Philip Vogt is born in Bavaria on 8 April.", s: [7] },
  { y: "before 1816", line: "wathen", t: "Thomas Wathen and Ann Simms reach Union County, Kentucky, 'first to Ky.' on the family chart.", s: [10] },
  { y: "1816", line: "wathen", t: "Joseph Burwell Waller is born on 23 August, a son of Aaron Waller and a Virginia-born Rives.", s: [11], n: true },
  { y: "1816–19", line: "daily", t: "William Daily crosses from Ireland, nine weeks under sail, and reaches Gallatin County with about $10. The Lawlers arrive in 1819.", s: [1, 17] },
  { y: "1827 or 1831", line: "zirkelbach", t: "Andrew Zirkelbach is born on 24 June in Bavaria. The family says 1831; the 1905 county history says 1827.", s: [2] },
  { y: "1836", line: "zirkelbach", t: "First Mass at St. James, in F. X. Weis's house. John A. Zirkelbach is born.", s: [22] },
  { y: "about 1837–40", line: "zirkelbach", t: "The Zirkelbachs and the Lintzenichs arrive and settle near St. James, on the Vanderburgh–Gibson line.", s: [2] },
  { y: "1839", line: "daily", t: "John Daily is born on 9 June on the first farm his father ever owned.", s: [1] },
  { y: "1840", line: "vogt", t: "Knight Township is organized on 10 September from the east end of Pigeon Township.", s: [8], n: true },
  { y: "1841", line: "zirkelbach", t: "Twenty families build St. Wendel's log church in Christmas week. Eleanora Stout is born near Mansfield, Ohio.", s: [23, 1] },
  { y: "1846", line: "wathen", t: "Thomas Raphael Wathen is born on 27 December in Union County.", s: [10], n: true },
  { y: "1847", line: "zirkelbach", t: "The log church at St. James is blessed on 25 July.", s: [22] },
  { y: "1850", line: "vogt", t: "Charles Vogt is born on 10 January in Hesse-Darmstadt.", s: [7] },
  { y: "1851", line: "wathen", t: "Polly Gillum Waller is born on 20 October in Union County.", s: [11], n: true },
  { y: "1852", line: "vogt", t: "John Philip and Hettie Vogt arrive in Vanderburgh County with two-year-old Charles.", s: [7] },
  { y: "1854", line: "zirkelbach", t: "William J. Zirkelbach, the eldest of Andrew and Katherine's children, is born on 14 November.", s: [2] },
  { y: "1858", line: "zirkelbach", t: "Margaret Zirkelbach Lintzenich dies on 1 November; her infant son Andrew follows on the 8th.", s: [3], n: true },
  { y: "1858", line: "daily", t: "William Daily dies owning about 1,000 acres, one of the county's leading stock raisers.", s: [1] },
  { y: "about 1859", line: "daily", t: "John Daily marries Eleanora Stout; they start in a one-room house with fifteen cleared acres.", s: [1] },
  { y: "1860", line: "wathen", t: "St. Agnes church is begun at Uniontown; Wathens serve on the lay committee.", s: [12], n: true },
  { y: "1860 or 1861", line: "vogt", t: "Hettie Vogt dies on 7 March. The family says 1861; the 1899 plat book says 1860.", s: [7] },
  { y: "1866", line: "daily", t: "Ridgway begins as a railroad construction camp.", s: [24] },
  { y: "1866 or 1896", line: "vogt", t: "John Philip Vogt dies on 20 September. The family says 1896; the 1899 plat book says 1866.", s: [7] },
  { y: "about 1870", line: "wathen", t: "Thomas Raphael Wathen marries Polly Gillum Waller.", s: [11], n: true },
  { y: "1871", line: "zirkelbach", t: "St. Joseph Catholic Cemetery is organized in Evansville by the Assumption, Holy Trinity and St. Mary parishes.", s: [30], n: true },
  { y: "1872", line: "zirkelbach", t: "Matthew, a son of Andrew Zirkelbach, is buried at St. James on 24 February.", s: [3], n: true },
  { y: "1873", line: "vogt", t: "Charles Vogt marries Elizabeth Pfingston on 3 April.", s: [7] },
  { y: "1874", line: "wathen", t: "Joseph Waller Wathen is born on 3 September at Uniontown.", s: [10] },
  { y: "1875", line: "zirkelbach", t: "Peter Frank Zirkelbach is born on 16 November near St. James.", s: [34] },
  { y: "1875", line: "vogt", t: "Phoebe “Bena” Vogt is born on 20 October in Knight Township.", s: [7] },
  { y: "1877", line: "daily", t: "Carrie Daily is born on 26 November in the Pond Settlement. That October the Waltonboro post office opens there.", s: [16] },
  { y: "about 1884", line: "wathen", t: "Thomas Raphael Wathen brings his three sons from Uniontown to Knight Township.", s: [10] },
  { y: "1884–85", line: "zirkelbach", t: "Much of the Zirkelbach family moves to Gallatin County, Illinois; William J. buys a farm near Ridgway. Pete is about ten.", s: [2] },
  { y: "1885", line: "vogt", t: "Peter Vogt joins the Evansville police, two years after the Metropolitan Police Act.", s: [5], n: true },
  { y: "1886", line: "vogt", t: "Charles Vogt is commissioned justice of the peace on 5 April.", s: [8], n: true },
  { y: "1886", line: "zirkelbach", t: "Regina Frederich Zirkelbach dies on 16 May, aged about 87.", s: [2] },
  { y: "1896", line: "wathen", t: "Joseph Wathen marries Bena Vogt on 9 February.", s: [10] },
  { y: "1898", line: "wathen", t: "Thomas Raphael Wathen dies in Evansville on 22 December and is buried at St. Joseph's.", s: [10], n: true },
  { y: "1899", line: "vogt", t: "The Illustrated Plat Book of Vanderburgh and Warrick Counties prints Charles Vogt's sketch.", s: [7], n: true },
  { y: "1900", line: "vogt", t: "Charles Vogt dies on 17 April. About this year Joseph Wathen buys the Bray farm on Pollack Avenue.", s: [7] },
  { y: "1903", line: "daily", t: "Pete Zirkelbach marries Carrie Daily at Waltonboro on 27 May, almost certainly at St. Patrick's, Pond Settlement.", s: [16, 49] },
  { y: "1905", line: "daily", t: "Memoirs of the Lower Ohio Valley prints the John Daily and William J. Zirkelbach sketches, the source of the family's account.", s: [1, 2], n: true },
  { y: "1911", line: "zirkelbach", t: "Cleo Wathen is born on 21 July; Donald Zirkelbach on 10 August.", s: [50] },
  { y: "1912", line: "daily", t: "Eleanora Stout Daily dies.", s: [50] },
  { y: "1914", line: "zirkelbach", t: "John A. Zirkelbach dies on 30 November, aged 77.", s: [4] },
  { y: "1915", line: "daily", t: "John Daily dies.", s: [50] },
  { y: "1917", line: "zirkelbach", t: "Andrew Zirkelbach dies in Evansville on 10 March. His daughter Regina Ziegler dies the same year.", s: [50, 34] },
  { y: "1920 or 1924", line: "zirkelbach", t: "Pete Zirkelbach joins the Evansville police. The family says 1920; the department's history says 22 October 1924.", s: [5] },
  { y: "1922", line: "vogt", t: "Elizabeth Pfingston Vogt dies.", s: [50] },
  { y: "1929", line: "wathen", t: "Cleo graduates from Bosse High School, opened only five years before.", s: [32] },
  { y: "1930", line: "zirkelbach", t: "Donald and Cleo marry on 5 April. Donald Jr. is born and dies on 3 November.", s: [50] },
  { y: "1934", line: "zirkelbach", t: "Pete dies on 17 February. Donald joins the police on 14 June.", s: [5] },
  { y: "1935", line: "zirkelbach", t: "Donald is one of twelve officers in the April police radio school, as the two-way radio system goes live.", s: [5] },
  { y: "1942–45", line: "wathen", t: "Republic Aviation builds 6,242 P-47s at Evansville; Cleo works in the employment office.", s: [27] },
  { y: "1948", line: "zirkelbach", t: "Donald and Herman Hayes become the department's two special-duty lieutenants.", s: [5] },
  { y: "1955", line: "zirkelbach", t: "Donald leaves the police after 21 years and goes to work for Bob Wright Motors.", s: [50, 25] },
  { y: "1956", line: "daily", t: "Carrie Daily Zirkelbach dies on 16 April.", s: [50] },
  { y: "1961", line: "vogt", t: "Bena Vogt Wathen dies on 14 August.", s: [50] },
  { y: "1970", line: "wathen", t: "Joseph Waller Wathen dies on 8 May.", s: [50] },
  { y: "1988", line: "wathen", t: "Cleo writes her account of her father's life.", s: [50] },
  { y: "1997", line: "zirkelbach", t: "Donald Zirkelbach dies on 16 November, after 67 years of marriage.", s: [50] },
  { y: "2007", line: "wathen", t: "Cleo Wathen Zirkelbach dies on 24 February.", s: [50] },
  { y: "2026", line: "zirkelbach", t: "The family tree is compiled from the family folder (30 October) and checked against the records (31 October).", s: [50] }
];

/* ---------------- Journeys ---------------- */
const JOURNEY = {
  nodes: [
    { id: "weg", x: 100, y: 70,  line: "zirkelbach", l1: "Wegfurt, Rhön", l2: "Bavaria" },
    { id: "lin", x: 100, y: 170, line: "zirkelbach", l1: "Linzenich, Rhineland", l2: "Prussia" },
    { id: "irl", x: 100, y: 330, line: "daily", l1: "Queen's County", l2: "Ireland" },
    { id: "bri", x: 100, y: 450, line: "wathen", l1: "Bristol", l2: "England" },
    { id: "hes", x: 100, y: 540, line: "vogt", l1: "Hesse-Darmstadt", l2: "and Bavaria" },
    { id: "stj", x: 350, y: 130, line: "zirkelbach", l1: "St. James and St. Wendel", l2: "Vanderburgh–Gibson line" },
    { id: "oh",  x: 350, y: 250, line: "daily", l1: "Mansfield", l2: "Ohio" },
    { id: "md",  x: 350, y: 450, line: "wathen", l1: "Charles County", l2: "Maryland" },
    { id: "gal", x: 600, y: 330, line: "daily", l1: "Gallatin County", l2: "Illinois" },
    { id: "ky",  x: 600, y: 450, line: "wathen", l1: "Union County", l2: "Kentucky" },
    { id: "evv", x: 850, y: 330, line: "all", l1: "Evansville", l2: "married 5 April 1930" },
    { id: "knt", x: 850, y: 500, line: "vogt", l1: "Knight Township", l2: "east of Evansville" }
  ],
  edges: [
    { from: "weg", to: "stj", line: "zirkelbach", label: "about 1837–40", who: "the Zirkelbachs" },
    { from: "lin", to: "stj", line: "zirkelbach", label: "about 1840", who: "the Lintzenichs" },
    { from: "stj", to: "gal", line: "zirkelbach", label: "1884–85", who: "much of the Zirkelbach family" },
    { from: "gal", to: "evv", line: "zirkelbach", label: "by 1905", who: "Pete and Carrie Zirkelbach" },
    { from: "irl", to: "gal", line: "daily", label: "1816–19", who: "William Daily" },
    { from: "oh",  to: "gal", line: "daily", label: "by 1859", who: "Eleanora Stout" },
    { from: "bri", to: "md",  line: "wathen", label: "1670", who: "John Wathen" },
    { from: "md",  to: "ky",  line: "wathen", label: "before 1816", who: "Thomas Wathen and Ann Simms" },
    { from: "ky",  to: "knt", line: "wathen", label: "about 1884", who: "Thomas Raphael Wathen and his sons" },
    { from: "hes", to: "knt", line: "vogt", label: "1852", who: "John Philip and Hettie Vogt" },
    { from: "knt", to: "evv", line: "wathen", label: "1930", who: "Cleo Wathen, to marry Donald" }
  ]
};

/* ---------------- Lawmen ---------------- */
const LAWMEN = [
  { who: "Charles Vogt", rel: "Bena's father", service: "Constable, two terms, and justice of the peace, Knight Township; commissioned JP 5 April 1886; road supervisor in 1899", line: "vogt", s: [7, 8] },
  { who: "Peter Vogt", rel: "A Vogt relative, probably Bena's uncle", service: "Evansville police, 1885–1926; the first officer to complete forty years", line: "vogt", s: [5] },
  { who: "Pete Zirkelbach", rel: "Donald's father", service: "Evansville police from 1920 (family) or 22 October 1924 (department history) until his death in 1934", line: "zirkelbach", s: [5] },
  { who: "Donald H. Zirkelbach", rel: "Pete's son, Cleo's husband", service: "Evansville police, 14 June 1934 to 1955; radio school 1935; special-duty lieutenant from 1948", line: "zirkelbach", s: [5] },
  { who: "John C. Zirkelbach", rel: "Donald and Cleo's son", service: "Evansville police", line: "zirkelbach", s: [] },
  { who: "William H. Woehler", rel: "Donald and Cleo's son-in-law", service: "Evansville police", line: "zirkelbach", s: [] },
  { who: "Adam Von Zirkelbach", rel: "Donald and Cleo's grandson", service: "Evansville police; the fourth generation", line: "zirkelbach", s: [5] },
  { who: "James Eric Zirkelbach", rel: "Donald and Cleo's son", service: "Air Force military police", line: "zirkelbach", s: [] }
];

/* ---------------- What the records added ---------------- */
const FINDINGS = [
  { line: "daily", h: "The family account's source, found", k: "published",
    t: "The Daily and Zirkelbach stories in the family tree match, nearly word for word, two sketches in Memoirs of the Lower Ohio Valley (Federal Publishing Co., 1905): John Daily in volume 1 and William J. Zirkelbach in volume 2. Both volumes are online in full, so every line of those two accounts can now be read in the original.", s: [1, 2] },
  { line: "daily", h: "William Daily's three wives, named", k: "published",
    t: "Sylvelia Cusick was John's mother; her other children were Thomas, Mary, the twins Sarah and Margaret, William and Joseph. Martha Huston, the second wife, died of rabies after a mad dog's bite that also bit William and John, who survived. The third was the widow Mary Luttrell, alive at eighty in White County in 1905. William's first land was 120 acres a mile from John's later home.", s: [1] },
  { line: "wathen", h: "Eight generations to a Bristol indenture", k: "published",
    t: "The Wathen Anthology (1999) runs the line Cleo, Joseph, Thomas Raphael, George, Thomas, Barton, John, John. The immigrant John Wathen signed a three-year indenture on 10 September 1670, sailed from Bristol on the Francis and Mary, worked as a carpenter and wheelwright, patented Wathen's Adventure at Port Tobacco in 1701 and signed his will in Charles County on 28 February 1705.", s: [10, 14] },
  { line: "wathen", h: "Thomas Raphael Wathen's dates, and a question about Polly", k: "conflict",
    t: "Born 27 December 1846, died 22 December 1898 in Evansville, buried at St. Joseph's Cemetery. The Anthology also says Polly died after 1880 in Evansville and is buried with him, where the family remembers her dying at Uniontown before the move. Vanderburgh death records, kept from 1882, would settle it.", s: [10] },
  { line: "wathen", h: "The bourbon cousins: the arithmetic works", k: "published",
    t: "The distilling Wathens descend from Hudson, a son named in the 1705 will; Cleo's line descends from his brother John. Henry Hudson Wathen settled near Lebanon in 1788, Richard Bernard built a distillery in 1852, and J. B. Wathen sold out to the Whiskey Trust in 1899 before the family bought Old Grand-Dad. On those two lineages Thomas Raphael and J. B. were fourth cousins, Joseph and R. E. Wathen fifth, and Cleo and R. E.'s children sixth. The Medley link was not reached in any source.", s: [10, 14, 33, 45] },
  { line: "wathen", h: "Burwell, not Burnell", k: "conflict",
    t: "Reliques of the Rives (1929) gives Polly's father as Joseph Burwell Waller, born 23 August 1816, a son of Aaron Waller and a Rives wife born in Virginia in 1790, and Polly's birth as 20 October 1851. It makes her mother Mary E. Harris a daughter of Benjamin and Innocent Ann (White) Harris. No Capt. Aaron Harris (1747–1809) was found in any Revolutionary roster; Aaron is the Waller name, so two lines may have been run together on the chart.", s: [11] },
  { line: "vogt", h: "The 1899 plat book, read from the page", k: "record",
    t: "The 'county biography' is the Illustrated Plat Book of Vanderburgh and Warrick Counties (Tillman & Fuller, 1899), digitized by the Indiana State Library. Its Vogt sketch says the family came in 1852, gives Philip's death as 20 September 1866 and Nellie M.'s as 7 March 1860, names Charles's offices (road supervisor; one term as justice, two as constable), and says Charles and Elizabeth were members of the Christian church. The years 1860 and 1866 are death dates, not arrival years.", s: [7] },
  { line: "vogt", h: "Two Vogt dates from county records", k: "record",
    t: "Elliott's 1897 county history lists Charles Vogt's commission as justice of the peace on 5 April 1886. The police department's history says Peter Vogt became its first forty-year officer in 1925 and retired in 1926 with forty-one years, which confirms an 1885 appointment.", s: [8, 5] },
  { line: "zirkelbach", h: "Three Zirkelbach milestones in the department's own words", k: "record",
    t: "The History of the Evansville Police Department dates Pete's appointment to 22 October 1924 and Donald's to 14 June 1934, names Donald among the twelve officers of the April 1935 radio school, and for 1948 names him and Herman Hayes as the two new special-duty lieutenants. It calls the Zirkelbachs the only family in the department's history with more than three generations of service.", s: [5] },
  { line: "zirkelbach", h: "St. James burial registers", k: "record",
    t: "Transcriptions of the St. James registers add Margaret Zirkelbach Lintzenich, died 1 November 1858, and her infant Andrew, who died a week later; Matthew, son of Andrew, buried 24 February 1872; an infant 'Guilelman', died 1871; John A. Zirkelbach, died 30 November 1914 aged 77, with his wife Maria O. (1841–1898) and son Anthony (died 1908); the Kissels on the same lot; and a broken stone reading '?egina O' that supports the Otillia name.", s: [3, 4] },
  { line: "daily", h: "Waltonboro, found on the map", k: "published",
    t: "Waltonboro was the post office of the Pond Settlement, the Irish Catholic colony midway between Shawneetown and New Haven, from 1877 to 1887; it reopened in 1890 as Doherty. The parish was St. Patrick's, with registers from 1842 to 1956 on microfilm, so Pete and Carrie's 1903 wedding was almost certainly there. Goodspeed names the Dalys among the settlement's founding families.", s: [6, 16, 49] },
  { line: "zirkelbach", h: "Wegfurt, and where the name comes from", k: "published",
    t: "Wegfurt belongs to Bischofsheim in der Rhön, a Catholic village on the old Bamberg–Fulda road with 423 people in 1832 and a parish church of 1601–07; it passed from the prince-bishops of Würzburg to Bavaria in 1814. The surname is taken from Zirkenbach, a hamlet of Fulda recorded in the twelfth century as Cirkumbach, just across the Hessian border. Indiana and Illinois lead the United States in Zirkelbachs today.", s: [18, 19, 20, 40] },
  { line: "zirkelbach", h: "Lintzenich is a place on the map too", k: "published",
    t: "Linzenich is a village of Zülpich in the Rhineland, Prussian from 1815 and now in North Rhine-Westphalia. The 1905 county history printed Katherine's name as 'Leutzhuick', which is why it never came up in a text search before.", s: [21, 40, 2] },
  { line: "daily", h: "The Lawler cousinship, still unproven", k: "unverified",
    t: "The only source for it is the 1905 sketch. Lawler's parents were John Lawler and Elizabeth Kelly of Monasterevin, County Kildare, on the Queen's County border; they left about 1818, paused in Frederick County, Maryland, and came down the Ohio to Gallatin County in 1819. John Lawler was remembered as the first Catholic in that part of Illinois and the founder of the Pond Settlement. No Lawler source names a Daily in the party.", s: [17, 2, 6] },
  { line: "wathen", h: "Evansville places, given their names", k: "published",
    t: "Wright Motors was Bob Wright Motors, Inc., Pontiac and Cadillac, 109 S.E. Third Street. The Little Sisters' home was St. John's Home for the Aged, 1236 Lincoln Avenue, 1882–2013. Republic Aviation built 6,242 P-47s between 1942 and 1945. Bosse opened in 1924; Lockyear ran from 1893 to 1991. St. Joseph Catholic Cemetery was organized in 1871 by three parishes; Oak Hill took its first burial in 1853; Park Lawn dates from 1923.", s: [25, 26, 28, 29, 27, 32, 43, 30, 31] },
  { line: "zirkelbach", h: "A Ridgway wedding and an Angus herd", k: "published",
    t: "William J. Zirkelbach married Anna K. Wenzel, farmed near Ridgway from 1885, kept a store for a year and by 1905 was breeding Aberdeen and Polled Angus cattle on eighty acres west of town. His daughter Cecilia married Peter J. Valter there in 1906.", s: [2, 15] }
];

/* Where the account and the records part ways */
const DISAGREEMENTS = [
  { who: "Andrew Zirkelbach", fam: "Born 24 June 1831", rec: "1827 in the 1905 Memoirs; his death record and the 1880 census support 1831", s: [2, 61] },
  { who: "Andrew Zirkelbach the elder", fam: "Died about 1870", rec: "Farmed until his death at 75, so about 1877 (1905 Memoirs); no St. James stone or register entry found", s: [2, 3, 4] },
  { who: "Pete Zirkelbach", fam: "Joined the police in 1920", rec: "Appointed 22 October 1924 (EPD history)", s: [5] },
  { who: "Pete Zirkelbach", fam: "Born 16 November 1875", rec: "Memorial heads 1876; the death-record transcription on it says 1875", s: [61] },
  { who: "Carrie Daily Zirkelbach", fam: "26 November 1877 – 16 April 1956", rec: "1878–1958 (Find a Grave memorial, St. Joseph Catholic Cemetery)", s: [61] },
  { who: "Polly Waller Wathen", fam: "Died at Uniontown before the family moved, about 1884", rec: "Died after 1880 in Evansville; buried with Thomas at St. Joseph's (Wathen Anthology)", s: [10] },
  { who: "Joseph Waller Wathen", fam: "Born 3 September 1874", rec: "Born 1873 (Reliques of the Rives)", s: [11] },
  { who: "Joseph Burwell Waller", fam: "Middle name Burnell", rec: "Burwell (Reliques of the Rives)", s: [11] },
  { who: "Mary Elizabeth Harris", fam: "Descends from Capt. Aaron Harris (1747–1809)", rec: "Daughter of Benjamin and Innocent Ann (White) Harris; no Capt. Aaron Harris found", s: [11] },
  { who: "John Philip Vogt", fam: "Died 20 September 1896", rec: "Died 20 September 1866 (1899 plat book)", s: [7] },
  { who: "Hettie Stumpf Vogt", fam: "Died 7 March 1861", rec: "Died 7 March 1860 (1899 plat book)", s: [7] },
  { who: "The Vogt county biography", fam: "A 1900 biography giving arrival years of 1860 and 1866", rec: "The 1899 plat book; it says the family arrived in 1852 and gives 1860 and 1866 as the parents' death dates", s: [7] },
  { who: "William Daily", fam: "Came about 1816–19, with the Lawlers", rec: "Lawler sources date their emigration about 1818, arriving in Gallatin County in 1819; none names a Daily", s: [17] },
  { who: "Thomas Wathen and Ann Simms", fam: "Moved from Charles County to Union County before 1816", rec: "Most Union County Catholics came by way of the older Kentucky colonies after 1818, so the move was probably in two stages", s: [12] }
];

/* Open questions, with the record that would answer each */
const LEADS = [
  { q: "Pete's birth year (1875 or 1876) and his police start (1920 or 1924)", how: "Open his Find a Grave memorial and the St. Joseph Catholic Cemetery records; search the Evansville Courier and Press for October 1924 and February 1934 in Hoosier State Chronicles.", links: [["Find a Grave 114292310", "https://www.findagrave.com/memorial/114292310/peter-zirkelbach"], ["Hoosier State Chronicles", "https://newspapers.library.in.gov/?a=q&txq=Zirkelbach"], ["St. Joseph Cemetery records", "https://www.stjoecemetery.org/"]] },
  { q: "Where Polly Waller Wathen died, and when", how: "Vanderburgh County death records begin in 1882; the St. Joseph Catholic Cemetery office can check for a burial beside Thomas (died 22 December 1898).", links: [["St. Joseph Cemetery", "https://www.stjoecemetery.org/"], ["FamilySearch: Vanderburgh County", "https://www.familysearch.org/en/wiki/Vanderburgh_County,_Indiana_Genealogy"]] },
  { q: "The Vogt death years (1860/1861, 1866/1896)", how: "The City of Evansville's Oak Hill Cemetery burial database lists plots and dates; the June 1860 and 1870 censuses of Knight Township would show who was alive.", links: [["Oak Hill Cemetery (City of Evansville)", "https://www.evansvillegov.org/city/department/division.php?structureid=67"], ["Find a Grave: Oak Hill", "https://www.findagrave.com/cemetery/1641002"]] },
  { q: "Katherine Lintzenich's parents and dates", how: "The St. Wendel marriage register (Diocese of Evansville archives) and the 1850 census of Vanderburgh County; the Zirkelbachs do not appear in the 1850 Gibson County census.", links: [["Diocese of Evansville", "https://www.evdio.org/"], ["INGenWeb Gibson County", "http://www.ingenweb.org/ingibson/"]] },
  { q: "William Daily's three marriages, his probate and his land", how: "Illinois Statewide Marriage Index (Daily/Daly, Gallatin County, 1820–1860); Gallatin County probate for 1858 at the Shawneetown courthouse or the Illinois Regional Archives Depository; BLM land patents for the 120 acres.", links: [["Illinois Statewide Marriage Index", "https://www.ilsos.gov/isavital/marriageSearch.do"], ["BLM General Land Office records", "https://glorecords.blm.gov/"]] },
  { q: "The 1903 wedding and the Daily baptisms", how: "St. Patrick Parish, Pond Settlement, church records 1842–1956 (microfilm; FamilySearch's Diocese of Belleville collection); St. Patrick and St. Joseph cemeteries are kept today by St. Kateri Parish, Ridgway.", links: [["WorldCat: St. Patrick Parish records", "https://search.worldcat.org/title/oclc/866779017"], ["St. Kateri Parish, Ridgway", "https://stkateri.net/"]] },
  { q: "The Lawler cousinship", how: "William Daily's mother's name is the key. The Lawler papers are at Southern Illinois University, Carbondale; Lucille Lawler's Gallatin County: Gateway to Illinois (1968) and Ridgway, Our Town (1971) cover the Pond Settlement families.", links: [["Lawler on Wikipedia, with sources", "https://en.wikipedia.org/wiki/Michael_Kelly_Lawler"]] },
  { q: "Capt. Aaron Harris", how: "Search the DAR Genealogical Research System and the SAR Patriot Research System for an Aaron Harris born 1747, died 1809; then check Reliques of the Rives, pages 354–359, in a library or on HathiTrust.", links: [["DAR Genealogical Research System", "https://services.dar.org/Public/DAR_Research/search_adb/"], ["SAR Patriot Research System", "https://sarpatriots.sar.org/"], ["Reliques of the Rives (Google Books)", "https://books.google.com/books?id=ZhobAAAAYAAJ"]] },
  { q: "The full Wathen line, generation by generation", how: "Carolyn Collins, The Wathen Anthology (1999), and Leonard E. Wathen Jr.'s Wathen's Adventure cover the Charles County generations; the Allen County Public Library in Fort Wayne holds genealogies of this kind.", links: [["The Wathen Anthology (Google Books)", "https://books.google.com/books?id=xr1YAAAAMAAJ"], ["thewathens.com", "https://www.thewathens.com/"]] },
  { q: "The Medley connection to the bourbon Wathens", how: "No source reached ties R. Wathen Medley into the line. The Charles Medley Distillery's own history and the Kentucky Room of the Daviess County Public Library in Owensboro are the places to ask.", links: [["Loretto: the Wathen distillers", "https://www.lorettocommunity.org/loretto-sister-athanasius-and-the-spirited-wathens/"]] },
  { q: "Wegfurt and the elder Zirkelbachs in Germany", how: "The Catholic registers of the Diocese of Würzburg are online at Matricula; emigration permits are at the Staatsarchiv Würzburg. Regina's 1799 baptism at Wegfurt would name her parents.", links: [["Matricula: Diocese of Würzburg", "https://data.matricula-online.eu/de/deutschland/wuerzburg/"], ["Bavarian State Archives", "https://www.gda.bayern.de"]] },
  { q: "The Pollack Avenue farm and the Vogt land", how: "The Vanderburgh County Recorder's deed index for Bray to Wathen (about 1900) and for Knight Township section 2; the 1896 Vogt probate at the county clerk; Willard Library's Regional and Family History Center, 21 N. First Avenue, Evansville.", links: [["Willard Library", "https://www.willard.lib.in.us/"], ["Browning Genealogy Database (EVPL)", "https://browning.evpl.org/"]] },
  { q: "The newspapers", how: "The Evansville Courier (1888–1998) and Press (1906–98) are on microfilm and in part online. Searches for Zirkelbach, Wathen and Lintzenich could not be run by script; run them in a browser.", links: [["Hoosier State Chronicles", "https://newspapers.library.in.gov/"], ["Chronicling America", "https://www.loc.gov/collections/chronicling-america/?q=Zirkelbach"], ["EVPL Browning database", "https://browning.evpl.org/"]] }
];


/* ---------------- Donald and Cleo's descendants ----------------
   Deceased people from public records; living people by name and relationship only,
   as a deceased relative's obituary states them. Branches marked open are waiting on the family. */
const DESCENDANTS = {
  name: "Donald H. and Cleo M. Zirkelbach", dates: "married 5 April 1930",
  children: [
    { name: "Donald Zirkelbach Jr.", dates: "3 November 1930", note: "Born and died the same day.", s: [51] },
    { name: "Jeryl Henry “Jerry” Zirkelbach", dates: "1933 – 13 September 2013", spouse: "Betty Gail Forston, 1 November 1952", note: "Air Force veteran; engineering degree from the University of Evansville; retired as vice president of sales and marketing at Cresline Plastics, then moved to Peoria, Arizona, where he died. Married sixty years. In 2013 he left twelve grandchildren and three great-grandchildren.", s: [62, 61],
      children: [
        { name: "Twin daughters", dates: "died 30 January 1962", note: "Buried at St. Joseph Catholic Cemetery, Evansville.", s: [61] },
        { name: "Michael D. “Mike” Zirkelbach", dates: "22 March 1961 – 26 August 2008", note: "Born in Evansville, died in Newburgh; buried at St. Joseph Catholic Cemetery.", s: [61, 62] },
        { name: "Jay H. Zirkelbach", dates: "9 February 1963 – 22 August 2023", spouse: "Linda (Wingert)", note: "Buried at St. Joseph Catholic Cemetery, Evansville, after services at Ziemer Funeral Home.", s: [52],
          children: [
            { name: "Chadwick Zirkelbach", spouse: "Brooke", children: [ { name: "Sadie Zirkelbach" } ] },
            { name: "Ashley Sapp", spouse: "Jeremy", children: [ { name: "Haley Sapp" }, { name: "Jayden Sapp" }, { name: "Kayla Sapp" } ] }
          ] },
        { name: "Chris Zirkelbach", s: [62] },
        { name: "Lucinda Lambros", s: [62] }
      ] },
    { name: "Thomas Joseph “Tom” Zirkelbach", note: "Living in 2013, per Jeryl's obituary.", s: [62], open: true },
    { name: "John Charles Zirkelbach", note: "Evansville police from 12 March 1973; living in 2013, per Jeryl's obituary.", s: [5, 62], open: true,
      children: [ { name: "Adam Von Zirkelbach", note: "Evansville police from 11 September 1995, the fourth generation; later federal law enforcement.", s: [5] } ] },
    { name: "James Eric Zirkelbach", note: "Air Force military police; living in 2013, per Jeryl's obituary.", s: [50, 62], open: true },
    { name: "Donna Maria Zirkelbach", spouse: "William H. Woehler, Evansville police", note: "Living in 2013, per Jeryl's obituary.", s: [50, 62], open: true }
  ]
};

/* Zirkelbachs in Evansville public records who are not yet placed on this tree */
const UNPLACED = [
  { name: "Philip Edward Zirkelbach, 1915–2010", t: "Born 7 March 1915 in Gallatin County, Illinois; died in Evansville. Army veteran; 21 years at Hoosier Cardinal and 25 at Sterling Brewery; St. Anthony's parish. Married Margaret M. Anslinger (1921–2016). His Gallatin birth points to Andrew's Ridgway grandchildren rather than Pete's family.", s: [63, 55] },
  { name: "Elmer Zirkelbach (1913–1999) and his family", t: "Married Lucille Drone (1919–2004). Children Richard “Zeke” (1945–2013; Marine Corps; part owner of The Car Company and once of the St. Joe Tavern; married Billie Jo McBride), Mary Joyce Calhoun (1941–2019), Janet L. Hamilton (1943–2016), Deborah Joan Blake (1950–2021) and Mark Edward (1957–2026). Zeke's children are Trish Ann Smithwick, Megan, Gabe and Bart, with seven grandchildren. Elmer's parents are not linked on his memorial; he may descend from one of Pete's brothers.", s: [63, 64, 58, 59] },
  { name: "George Vincent Zirkelbach, 1879–1959", t: "Born in Vanderburgh County; married Rosa M. Doerr (1883–1949) in 1900. Their son Albert Andrew (1903–1964) was born in Gallatin County; daughters Celia Himes, Anna Marie Zeggling, Margaret Baumgart and Viola Meredith. Very likely a grandson of Andrew through one of the Ridgway sons.", s: [63] },
  { name: "Don R. and Sylvia (Hagan) Zirkelbach, Albany, Georgia", t: "Sylvia, an Evansville native, died in 2008 after 53 years of marriage; Don Raphael Zirkelbach (1936–2012) is buried at Andersonville National Cemetery. Children John and Ellen; a daughter Rebecca died before her.", s: [57] },
  { name: "Janet Gail “Jan” (Weikel) Zirkelbach (2026), Cheryl Christina Zirkelbach (2025)", t: "Recent Browning Funeral Home obituaries, not yet read.", s: [60] }
];

/* Updates from the family, newest first */
const CHANGELOG = [
  { d: "31 October 2026", t: "Records pass: Katherine Lintzenich's dates and parents (Christian and Mary) from her death record; Andrew's grave and 1880 household; Pete's daughters Eleanor Grimmeissen and Veronica Osha; Jeryl's full branch from his 2013 obituary, including the twins (1962) and Mike (1961–2008); Gallatin County Zirkelbachs sorted for the family to confirm or rule out; Andrew's thirteen children with spouses and dates; the Elmer and Zeke Zirkelbach family. The interactive tree now opens downward from Donald and Cleo." },
  { d: "31 October 2026", t: "Site published. Donald and Cleo's family opened downward; Jeryl's branch added from Jay H. Zirkelbach's 2023 obituary; the form for additions and corrections went live." }
];

/* Where the form sends its notes (a public, append-only relay; a GitHub Action turns each note into a repository issue) */
const INBOX = { topic: "zw-family-n545uzi2aupzsygbhna642", repo: "mattzirkelbach-pixel/zirkelbach-wathen" };

/* ---------------- Sources ---------------- */
const SOURCES = [
  { n: 1, t: "Memoirs of the Lower Ohio Valley, vol. 1 (Federal Publishing Co., 1905), pp. 409–410, John Daily sketch", u: "https://archive.org/details/memoirsofloweroh01fede", k: "published" },
  { n: 2, t: "Memoirs of the Lower Ohio Valley, vol. 2 (1905), pp. 303–304, William J. Zirkelbach sketch", u: "https://archive.org/details/memoirsofloweroh02fede", k: "published" },
  { n: 3, t: "St. James Cemetery (old), Johnson Township, Gibson County: transcription of stones and church burial records (D. Ellott, 2009), INGenWeb", u: "http://ingenweb.org/ingibson/Cemeteries_wPhotos/Johnson%20Twp/St_James_Old/St_James_Old_textonly.html", k: "record" },
  { n: 4, t: "St. James Cemetery (new), Johnson Township, Gibson County: transcription, INGenWeb", u: "http://ingenweb.org/ingibson/Cemeteries_wPhotos/Johnson%20Twp/St_James_New/St_James_New_textonly.html", k: "record" },
  { n: 5, t: "History of the Evansville Police Department (unabridged), Evansville Police Department", u: "https://evansvillepolice.com/wp-content/uploads/2022/05/HISTORY-OF-THE-EVANSVILLE-POLICE-DEPARTMENT-unabridged.pdf", k: "record" },
  { n: 6, t: "Goodspeed, History of Gallatin, Saline, Hamilton, Franklin and Williamson Counties, Illinois (1887)", u: "https://archive.org/details/historyofgallati00chic", k: "published" },
  { n: 7, t: "An Illustrated Plat Book of Vanderburgh and Warrick Counties, Indiana (Tillman & Fuller, 1899), Indiana State Library on Indiana Memory; Vogt sketch on the biographical pages, Knight Township plat", u: "https://indianamemory.contentdm.oclc.org/digital/collection/p15078coll8/id/1374", k: "record" },
  { n: 8, t: "Joseph P. Elliott, A History of Evansville and Vanderburgh County (1897)", u: "https://archive.org/details/historyofevansvi00elli", k: "published" },
  { n: 9, t: "Brant & Fuller, History of Vanderburgh County, Indiana (1889)", u: "https://archive.org/details/historyofvanderb00bran", k: "published" },
  { n: 10, t: "Carolyn Collins, The Wathen Anthology (1999), snippet view", u: "https://books.google.com/books?id=xr1YAAAAMAAJ", k: "published" },
  { n: 11, t: "James Rives Childs, Reliques of the Rives (1929), Waller and Wathen entries, snippet view", u: "https://books.google.com/books?id=ZhobAAAAYAAJ", k: "published" },
  { n: 12, t: "Benedict J. Webb, The Centenary of Catholicity in Kentucky (1884)", u: "https://archive.org/details/centenaryofcatho00webb", k: "published" },
  { n: 13, t: "History of Union County, Kentucky (1886), religion chapter, Genealogy Trails transcription", u: "http://genealogytrails.com/ken/union/histofunion_religion.html", k: "published" },
  { n: 14, t: "Leonard E. Wathen Jr., “Who was John Wathen of Southern Maryland?”, thewathens.com", u: "https://www.thewathens.com/pages/who-was-john-wathen-of-southern-maryland", k: "published" },
  { n: 15, t: "George W. Smith, A History of Southern Illinois, vol. 3 (1912), Peter J. Valter sketch", u: "https://archive.org/details/historyofsouther03smit", k: "published" },
  { n: 16, t: "Gallatin County town histories (Waltonboro, Doherty, Pond Settlement), Genealogy Trails", u: "http://genealogytrails.com/ill/gallatin/townhistories.html", k: "published" },
  { n: 17, t: "Michael Kelly Lawler, Wikipedia (citing Pitkin 1965 and Dorris 1955)", u: "https://en.wikipedia.org/wiki/Michael_Kelly_Lawler", k: "published" },
  { n: 18, t: "Wegfurt, German Wikipedia", u: "https://de.wikipedia.org/wiki/Wegfurt", k: "published" },
  { n: 19, t: "Bischofsheim in der Rhön, German Wikipedia", u: "https://de.wikipedia.org/wiki/Bischofsheim_an_der_Rh%C3%B6n", k: "published" },
  { n: 20, t: "Surname Zirkelbach (Geneanet) and Zirkenbach, Fulda (German Wikipedia)", u: "https://en.geneanet.org/surnames/ZIRKELBACH", k: "unverified" },
  { n: 21, t: "Zülpich (with Linzenich), Wikipedia", u: "https://en.wikipedia.org/wiki/Z%C3%BClpich", k: "published" },
  { n: 22, t: "History of St. James Catholic Church, Haubstadt, compiled from the 1888 and 1914 Gibson County histories", u: "https://www.adlerreunion.com/single-post/2013/12/28/history-of-st-james-catholic-church-in-haubstadt-indiana", k: "published" },
  { n: 23, t: "Saint Wendel, Indiana, Wikipedia", u: "https://en.wikipedia.org/wiki/Saint_Wendel,_Indiana", k: "published" },
  { n: 24, t: "Ridgway, Illinois, Wikipedia; St. Kateri Parish, Ridgway", u: "https://en.wikipedia.org/wiki/Ridgway,_Illinois", k: "published" },
  { n: 25, t: "Bob Wright Motors postcard (1940s), EVPL Digital Archive", u: "https://digital.evpl.org/digital/collection/evapost/id/208/", k: "record" },
  { n: 26, t: "Willard Library historic photograph collection: Wright Motors used car lot, Sixth and Walnut, early 1950s", u: "https://www.willardlib.org/historic-photo-collection-businesses-and-industries-q-z", k: "record" },
  { n: 27, t: "National Park Service, “Defense Manufacturing in Evansville, Indiana”", u: "https://www.nps.gov/articles/000/h-our-history-lesson-defense-manufacturing-in-evansville-indiana-world-war-ii-heritage-city.htm", k: "published" },
  { n: 28, t: "Historic Evansville: Little Sisters of the Poor; Lockyear Business College; Park Lawn Cemetery", u: "https://historicevansville.com/site.php?id=poorsisters", k: "published" },
  { n: 29, t: "WFIE, “Little Sisters of the Poor's century-old legacy of caring draws to a close” (2013)", u: "https://www.14news.com/story/23706744/little-sisters-of-the-poors-century-old-legacy-of-caring-draws-to-a-close/", k: "published" },
  { n: 30, t: "St. Joseph Catholic Cemetery, Evansville: history", u: "https://www.stjoecemetery.org/history", k: "published" },
  { n: 31, t: "Oak Hill Cemetery (Evansville), Wikipedia", u: "https://en.wikipedia.org/wiki/Oak_Hill_Cemetery_(Evansville,_Indiana)", k: "published" },
  { n: 32, t: "Benjamin Bosse High School, Wikipedia", u: "https://en.wikipedia.org/wiki/Benjamin_Bosse_High_School", k: "published" },
  { n: 33, t: "Brian Haara, “The Wathen Family Pokes the 800-Pound Gorilla” (2014); Loretto Community, “Sister Athanasius and the Spirited Wathens”", u: "https://brianhaara.com/2014/12/17/the-wathen-family-pokes-the-800-pound-gorilla-the-whiskey-trust/", k: "published" },
  { n: 34, t: "Find a Grave memorials located by search but not opened: Peter F. Zirkelbach (114292310); Regina Zirkelbach Ziegler (118871163); Michael H. Kissel (44287231)", u: "https://www.findagrave.com/memorial/114292310/peter-zirkelbach", k: "unverified" },
  { n: 35, t: "Evansville breweries, transcribed from Brant & Fuller (1889), Genealogy Trails", u: "https://genealogytrails.com/ind/vanderburgh/Evansvillebeer.html", k: "published" },
  { n: 36, t: "Holy Cross Church (Marion County, Kentucky), Wikipedia", u: "https://en.wikipedia.org/wiki/Holy_Cross_Church_(Marion_County,_Kentucky)", k: "published" },
  { n: 37, t: "Uniontown, Kentucky, Wikipedia", u: "https://en.wikipedia.org/wiki/Uniontown,_Kentucky", k: "published" },
  { n: 38, t: "“Famine and emigration hit Ireland: 1817”, History Home", u: "https://www.historyhome.co.uk/c-eight/ireland/ire1817.htm", k: "published" },
  { n: 39, t: "Evansville's German Heritage, historical marker (HMDB)", u: "https://www.hmdb.org/m.asp?m=226796", k: "published" },
  { n: 40, t: "Surname statistics: MyNameStats (Zirkelbach); NameCensus (Lintzenich)", u: "https://www.mynamestats.com/Last-Names/Z/ZI/ZIRKELBACH/index.html", k: "unverified" },
  { n: 41, t: "Willi Paul Adams, The German-Americans, ch. 1 (Max Kade German-American Center)", u: "https://library.indianapolis.iu.edu/static/collections/kade/adams/chap1.html", k: "published" },
  { n: 42, t: "1850 census, Johnson Township, Gibson County, Indiana, INGenWeb transcription", u: "http://www.ingenweb.org/ingibson/CensusRecords/FC1850/Census_1850_links.html", k: "record" },
  { n: 43, t: "Lockyear College, Wikipedia", u: "https://en.wikipedia.org/wiki/Lockyear_College", k: "published" },
  { n: 44, t: "Indiana Historical Bureau, Little Sisters of the Poor marker", u: "https://www.in.gov/history/state-historical-markers/find-a-marker/find-historical-markers-by-county/indiana-historical-markers-by-county/little-sisters-of-the-poor/", k: "published" },
  { n: 45, t: "Richard B. Wathen, Wikipedia", u: "https://en.wikipedia.org/wiki/Richard_B._Wathen", k: "published" },
  { n: 46, t: "History of Gallatin County, Illinois (RootsWeb)", u: "https://sites.rootsweb.com/~ilgallat/gch.htm", k: "published" },
  { n: 47, t: "Evansville Police Department, history timeline", u: "https://evansvillepolice.com/epd-history/", k: "published" },
  { n: 48, t: "Diocese of Evansville, History of the Diocese", u: "https://www.evdio.org/history-of-the-diocese.html", k: "published" },
  { n: 49, t: "Pond Settlement, St. Patrick Parish, church records 1842–1956 (microfilm), WorldCat", u: "https://search.worldcat.org/title/oclc/866779017", k: "record" },
  { n: 50, t: "The family folder: Cleo Wathen Zirkelbach's 1988 account, the family charts, the law-enforcement list, a 2009 register of Andrew Zirkelbach's descendants, a 2006 register of the Vogt family's descendants, and a 1999 Wathen family history, as compiled in the family tree of 30 October 2026", u: "", k: "family" },
  { n: 51, t: "Donald Zirkelbach Jr. (1930–1930), Find a Grave memorial 137716244 (title only)", u: "https://www.findagrave.com/memorial/137716244/donald-zirkelbach", k: "unverified" },
  { n: 52, t: "Jay H. Zirkelbach obituary (1963–2023), Ziemer Funeral Home, via Echovita", u: "https://www.echovita.com/us/obituaries/in/evansville/jay-h-zirkelbach-16836939", k: "published" },
  { n: 53, t: "Jeryl Zirkelbach obituary (2013), Arizona Republic via Legacy.com (see 62)", u: "https://www.legacy.com/us/obituaries/azcentral/name/jeryl-zirkelbach-obituary?id=19215400", k: "unverified" },
  { n: 54, t: "1950 United States census name index, Zirkelbach, Indiana (National Archives)", u: "https://1950census.archives.gov/search/?name=Zirkelbach&state=IN", k: "record" },
  { n: 55, t: "Margaret M. Zirkelbach obituary (1921–2016), Pierre Funeral Home", u: "https://www.pierrefuneralhome.com/obituaries/Margaret-Zirkelbach/", k: "published" },
  { n: 56, t: "Find a Grave memorials (titles only): Lucille Drone Zirkelbach 114292152; Chester Raymond Zirkelbach 96137857", u: "https://www.findagrave.com/memorial/114292152/lucille-zirkelbach", k: "unverified" },
  { n: 57, t: "Sylvia Dean Zirkelbach obituary (2008), Courier & Press via Legacy.com", u: "https://www.legacy.com/us/obituaries/courierpress/name/sylvia-zirkelbach-obituary?id=24892145", k: "published" },
  { n: 58, t: "Mark Edward Zirkelbach obituary (1957–2026), Pierre Funeral Home", u: "https://www.pierrefuneralhome.com/obituaries/mark-zirkelbach/", k: "published" },
  { n: 59, t: "Julie A. Zirkelbach obituary (1976–2022), Pierre Funeral Home, via Echovita", u: "https://www.echovita.com/us/obituaries/in/evansville/julie-a-zirkelbach-15230975", k: "published" },
  { n: 60, t: "Browning Funeral Home obituaries via Legacy.com: Janet Gail Zirkelbach (2026); Cheryl Christina Zirkelbach (2025) (listings only)", u: "https://www.legacy.com/us/obituaries/name/janet-zirkelbach-obituary?id=61336437", k: "unverified" },
  { n: 61, t: "Find a Grave memorials read 31 October 2026, with the death-record and census transcriptions posted on them: Andrew Zirkelbach 207292650; Mary Catherine Lintzenich Zirkelbach 207292716; Peter F. Zirkelbach 114292310; Carolyn Daily Zirkelbach 119491882; Eleanor Zirkelbach Grimmeissen 114539375; Donald H. Zirkelbach 115787372; Cleo Margaret Wathen Zirkelbach 115787385; Donald Jr. 137716244; Jeryl H. Zirkelbach 243906276; twin daughters 114997129; Michael D. Zirkelbach 115410715", u: "https://www.findagrave.com/memorial/207292716/mary_catherine-zirkelbach", k: "published" },
  { n: 62, t: "Jeryl Henry “Jerry” Zirkelbach obituary, The Arizona Republic, September 2013", u: "https://www.legacy.com/us/obituaries/azcentral/name/jeryl-zirkelbach-obituary?id=19215400", k: "published" },
  { n: 63, t: "Find a Grave, St. Joseph Catholic Cemetery, Evansville: Philip Edward Zirkelbach 114292211; Elmer Zirkelbach 114292094; Albert Andrew Zirkelbach 143288289; Abe W. Zirkelbach 115586159", u: "https://www.findagrave.com/cemetery/86698/memorial-search?lastname=Zirkelbach", k: "published" },
  { n: 64, t: "Richard “Zeke” Zirkelbach obituary (1945–2013), Courier & Press via Legacy.com", u: "https://www.legacy.com/us/obituaries/courierpress/name/richard-zirkelbach-obituary?id=20789672", k: "published" },
  { n: 65, t: "Find a Grave memorials of Andrew Zirkelbach's children: Regina Ziegler 118871163; Margaret Ottman 114189366; Barbara Bauer 64748236; George J. 49874773; Frank Joseph 96138007; Mary M. Kohl 47884683; William J. 64748587; Andrew H. 64748577", u: "https://www.findagrave.com/memorial/207292650/andrew-zirkelbach", k: "published" }
];
