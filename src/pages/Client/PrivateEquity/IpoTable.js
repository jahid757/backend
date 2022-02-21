import React from "react"
import { Card, CardBody, CardTitle, Badge, Button } from "reactstrap"
import { Link } from "react-router-dom"

import { moneyFormatter, moneyNoFormat, remove00ForCurrency } from 'helpers/utils';
import IpoTableRow from './IpoTableRow';

const IpoTable = ({ ipos, availableDeposit }) => {
  const IPOs = [
    {
        logo: "https://freshremote.work/media/company/logo/20/10/Instacart.png",
        company: "Instacart",
        symbol: "INSTA",
        leadManager: "Goldman Sachs",
        sharesVol: 300,
        sharesPrice: 75,
        listingRange: "$0-0",
        estValue: 28000,
        expectedToTrade: "2021",
        actions: "",
        prospectus: "",
    },
    {
        logo: "https://brokerchooser.com/uploads/broker_logos/robinhood-review.png",
        company: "Robinhood",
        symbol: "-",
        leadManager: "Goldman Sachs",
        sharesVol: 750,
        sharesPrice: 55,
        listingRange: "$14-39",
        estValue: 18000,
        expectedToTrade: "Q2 2021",
        actions: "",
        prospectus: "",
    },
    {
        logo: "https://media.glassdoor.com/sqll/954734/databricks-squarelogo-1587355066260.png",
        company: "Databricks",
        symbol: "-",
        leadManager: "-",
        sharesVol: 140,
        sharesPrice: 27,
        listingRange: "$0-0",
        estValue: 62000,
        expectedToTrade: "2021",
        actions: "",
        prospectus: "",
    },
    {
        logo: "https://media.glassdoor.com/sqll/1102519/uipath-squarelogo-1571834817890.png",
        company: "Uipath",
        symbol: "-",
        leadManager: "-",
        sharesVol: 550,
        sharesPrice: 13,
        listingRange: "$0-0",
        estValue: 7800,
        expectedToTrade: "2021",
        actions: "",
        prospectus: "",
    },
    {
        logo: "https://cdn.freebiesupply.com/logos/large/2x/ripple-2-logo-png-transparent.png",
        company: "Ripple",
        symbol: "-",
        leadManager: "-",
        sharesVol: 0,
        sharesPrice: 39,
        listingRange: "$0-0",
        estValue: 7100,
        expectedToTrade: "2021",
        actions: "",
        prospectus: "",
    },
    {
        logo: "https://provape.com/media/amasty/shopby/option_images/juul-logo.png",
        company: "Juul",
        symbol: "-",
        leadManager: "-",
        sharesVol: 130,
        sharesPrice: 202,
        listingRange: "$0-0",
        estValue: 27000,
        expectedToTrade: "2021",
        actions: "",
        prospectus: "",
    },
    {
        logo: "https://media-exp1.licdn.com/dms/image/C4E0BAQEfwTT0EKdJhg/company-logo_200_200/0/1519899921208?e=2159024400&v=beta&t=tIRW4Tc5tHh81cZrZEPm4UrBoZ6ABiBSx4ajHpkG4WE",
        company: "Eg Group",
        symbol: "-",
        leadManager: "-",
        sharesVol: 0,
        sharesPrice: 0,
        listingRange: "$0-0",
        estValue: 1000,
        expectedToTrade: "2021",
        actions: "",
        prospectus: "",
    },
    {
        logo: "https://www.redditinc.com/assets/images/site/reddit-logo.png",
        company: "Reddit",
        symbol: "-",
        leadManager: "-",
        sharesVol: 140,
        sharesPrice: 30,
        listingRange: "$35-45",
        estValue: 3000,
        expectedToTrade: "2021",
        actions: "",
        prospectus: "",
    },
    {
        logo: "http://assets.stickpng.com/images/602e3175d9ced200045a577c.png",
        company: "Nextdoor",
        symbol: "-",
        leadManager: "Citigroup",
        sharesVol: 110,
        sharesPrice: 20,
        listingRange: "$25-35",
        estValue: 2500,
        expectedToTrade: "2021",
        actions: "",
        prospectus: "",
    },
    {
        logo: "https://sustainablebrands.com/eddy/dir/brand/logos/9551/brandlogo.png",
        company: "Impossible Foods",
        symbol: "-",
        leadManager: "-",
        sharesVol: 260,
        sharesPrice: 11,
        listingRange: "$25-29",
        estValue: 4500,
        expectedToTrade: "2021",
        actions: "",
        prospectus: "",
    },
    {
        logo: "https://pbs.twimg.com/profile_images/1361803492554326021/YT9flmh5.jpg",
        company: "Klarna",
        symbol: "-",
        leadManager: "Goldman Sachs",
        sharesVol: 160,
        sharesPrice: 550,
        listingRange: "$640-710",
        estValue: 0,
        expectedToTrade: "2021",
        actions: "",
        prospectus: "",
    },
    {
        logo: "https://about.gitlab.com/images/press/logo/png/gitlab-icon-rgb.png",
        company: "Gitlab",
        symbol: "-",
        leadManager: "Merill Lynch",
        sharesVol: 150,
        sharesPrice: 7,
        listingRange: "$11-15",
        estValue: 3000,
        expectedToTrade: "2021",
        actions: "",
        prospectus: "",
    },
    {
        logo: "https://logos-world.net/wp-content/uploads/2021/03/Stripe-Emblem.png",
        company: "Stripe",
        symbol: "-",
        leadManager: "-",
        sharesVol: 0,
        sharesPrice: 0,
        listingRange: "$0-0",
        estValue: 1000,
        expectedToTrade: "2021",
        actions: "",
        prospectus: "",
    },
    {
        logo: "https://www.starlink.com/assets/images/logo_x_black.png",
        company: "Starlink",
        symbol: "-",
        leadManager: "-",
        sharesVol: 0,
        sharesPrice: 0,
        listingRange: "$0-0",
        estValue: 7474,
        expectedToTrade: "Q4 2021",
        actions: "",
        prospectus: "",
    }
  ]

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          {/* <CardTitle className="mb-4">Initial Coin Offerings</CardTitle> */}
          <div className="table-responsive">
            <table className="table align-middle table-nowrap mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{ textAlign: "center" }}>Logo</th>
                  <th style={{ textAlign: "center" }}>Company</th>
                  <th style={{ textAlign: "center" }}>Proposed<br />Symbol</th>
                  <th style={{ textAlign: "center" }}>Lead<br /> Manager</th>
                  <th style={{ textAlign: "center" }}>Shares<br />(millions)</th>
                  <th style={{ textAlign: "center" }}>Listing<br /> Range</th>
                  <th style={{ textAlign: "center" }}>Est. Valuation<br />(millions)</th>
                  <th style={{ textAlign: "center" }}>Expected to<br /> Trade</th>
                  <th style={{ textAlign: "center" }}>Share<br /> Price</th>
                  <th style={{ textAlign: "center" }}>Actions</th>
                  <th style={{ textAlign: "center" }}>Prospectus</th>
                </tr>
              </thead>
              <tbody>
                {ipos.map((ipo, key) => {
                  return (
                    <IpoTableRow ipo={ipo} availableDeposit={availableDeposit} key={key} />
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default IpoTable;
