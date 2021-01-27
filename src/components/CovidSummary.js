import React from 'react'
import Card from './Card'
import NumberFormat from 'react-number-format'


function CovidSummary(props) {
    const {
        totalConfirmed,
        totalRecovered,
        totalDeath,
        country
    } = props
    return (
        <div>
            <div>
                <h1>{country === '' ? 'WorldWide' : country} Corona Report</h1>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card> <span>Total Confirmed</span>
                        <br />
                        <span>{<NumberFormat
                            value={totalConfirmed}
                            displayType={'text'}
                            thousandSeparator={true}

                        />}</span>
                    </Card>
                    <Card> <span>Total Recovered</span>
                        <br />
                        <span>{<NumberFormat
                            value={totalRecovered}
                            displayType={'text'}
                            thousandSeparator={true}

                        />}</span>
                    </Card>
                    <Card> <span>Total Deaths</span>
                        <br />
                        <span>{<NumberFormat
                            value={totalDeath}
                            displayType={'text'}
                            thousandSeparator={true}

                        />}</span>
                    </Card>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default CovidSummary
