import { useState } from 'react'

const ChitFund = () => {
    const [months, setMonths] = useState(3)
    const [emi, setEmi] = useState(100000)
    const [roi, setRoi] = useState(18)
    const [borrower, setBorrower] = useState(months / roi)

    const tableCreator = (months, emi, roi) => {
        var row = []
        var table = []
        var interest = roi
        for (let count = 0; count < months; count++) {
            if (count === 0) {
                // month
                row.push(count + 1)
                // win money
                row.push((emi - emi * (interest / 100)) * months)
                // interest rate
                row.push(interest)
                // Dividend
                row.push((emi * (interest / 100)) / months / months)
            } else {
                // month
                row.push(count + 1)
                // win money
                row.push((emi - emi * (interest / 100)) * months)
                // interest rate
                row.push(interest)
                // Dividend
                row.push((emi * (interest / 100)) / months / months)
            }
            interest = interest - roi / (roi - borrower)
            table.push(row)
            row = []
        }

        table.forEach((row, i, arr) => {
            row.push(
                row[1] +
                    arr.map((e) => e[3]).reduce((a, b) => a + b, 0) -
                    row[3]
            )
        })

        table.forEach((row) => {
            console.log(row[4], emi * months)
            row.push(((row[4] - emi * months) / (emi * months)) * 100)
        })

        return table
    }

    return (
        <div className="w-full h-full overflow-y-scroll flex flex-col px-4 py-2">
            <div className="w-auto my-4 mx-auto">
                <h1 className="text-4xl font-semibold uppercase tracking-wide text-blueGray-800">
                    Chit Calculator
                </h1>
            </div>
            <div className="w-3/4 my-4 mx-auto p-4 border-2 border-blueGray-200 bg-blueGray-50 rounded-xl">
                <div className="my-4 flex flex-col w-full">
                    <label for="months" className="">
                        months : <span>{months}</span>
                    </label>
                    <input
                        id="months"
                        type="range"
                        min="1"
                        max="60"
                        step="1"
                        value={months}
                        onChange={(e) => {
                            setMonths(e.target.valueAsNumber)
                        }}
                    />
                </div>
                <div className="my-4 flex flex-col w-full">
                    <label for="emi" className="">
                        emi :{' ₹'}
                        <input
                            type="text"
                            className="w-16"
                            value={emi}
                            onInput={(e) => {
                                parseInt(e.target.value) > 500000
                                    ? setEmi(500000)
                                    : setEmi(parseInt(e.target.value))
                            }}
                        />
                    </label>
                    <input
                        id="emi"
                        type="range"
                        min="1000"
                        max="500000"
                        step="1000"
                        value={emi}
                        onChange={(e) => {
                            setEmi(e.target.valueAsNumber)
                        }}
                    />
                </div>
                <div className="my-4 flex flex-col w-full">
                    <label for="roi" className="">
                        roi : <span>{roi}</span>
                        {'%'}
                    </label>
                    <input
                        id="roi"
                        type="range"
                        min="4"
                        max="60"
                        step="1"
                        value={roi}
                        onChange={(e) => {
                            setRoi(e.target.valueAsNumber)
                        }}
                    />
                </div>
                <div className="my-4 flex flex-col w-full">
                    <label for="borrower" className="">
                        borrowers : <span>{borrower}</span>
                        {'%'}
                    </label>
                    <input
                        id="borrower"
                        type="range"
                        min={1}
                        max={roi - 1}
                        step={1}
                        value={borrower}
                        onChange={(e) => {
                            setBorrower(e.target.valueAsNumber)
                        }}
                    />
                </div>
            </div>
            <div className="w-3/4 my-4 mx-auto p-4 overflow-x-scroll border-2 border-blueGray-200 bg-blueGray-50 rounded-xl">
                <div className="w-min mt-2 mb-4 mx-auto">
                    <h4 className="w-max text-lg text-blueGray-800">
                        Each Month{' '}
                        <span className="font-semibold">{months}</span> users
                        will pay up{' '}
                        <span className="font-semibold">₹{parse(emi)}</span> and
                        raise{' '}
                        <span className="font-semibold">
                            ₹{parse(months * emi)}
                        </span>{' '}
                        as Pot money.
                    </h4>
                </div>
                <table class="table-fixed mx-auto">
                    <thead>
                        <tr>
                            <th class="w-24 px-4 py-2 text-blueGray-600">
                                Month
                            </th>
                            <th class="w-48 px-4 py-2 text-blueGray-600">
                                Win Money
                            </th>
                            <th class="w-24 px-4 py-2 text-blueGray-600">
                                Interest
                            </th>
                            <th class="w-24 px-4 py-2 text-blueGray-600">
                                Dividend
                            </th>
                            <th class="w-36 px-4 py-2 text-blueGray-600">
                                Total Withdrawal
                            </th>
                            <th class="w-24 px-4 py-2 text-blueGray-600">
                                P/L
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableCreator(months, emi, roi).map((row) => (
                            <tr className="bg-blueGray-200">
                                <td class="border border-blueGray-500 px-4 py-2 text-blueGray-600 font-medium">
                                    {row[0]}
                                </td>
                                <td class="border border-blueGray-500 px-4 py-2 text-blueGray-600 font-medium">
                                    ₹ {Math.floor(row[1])}
                                </td>
                                <td class="border border-blueGray-500 px-4 py-2 text-blueGray-600 font-medium">
                                    {Math.floor(row[2])} %
                                </td>
                                <td class="border border-blueGray-500 px-4 py-2 text-blueGray-600 font-medium">
                                    ₹ {Math.floor(row[3])}
                                </td>
                                <td class="border border-blueGray-500 px-4 py-2 text-blueGray-600 font-medium">
                                    ₹ {parse(Math.floor(row[4]))}
                                </td>
                                <td class="border border-blueGray-500 px-4 py-2 text-blueGray-600 font-medium">
                                    {parse(Math.floor(row[5]))} %
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ChitFund

function parse(n) {
    var rounded = Math.round(n)
    var value = rounded.toString()
    var number = []
    var c = 1
    var num = ''
    const reve = (n) => {
        var str = ''
        for (let i = n.length - 1; i >= 0; i--) {
            if (i === n.length - 1 && n.charAt(i) === ',') {
                continue
            }
            str += n.charAt(i)
        }
        return str
    }

    for (let i = 0; i < value.length; i++) {
        number[i] = value.charAt(i)
    }
    for (let i = number.length - 1; i >= 0; i--) {
        num += number[i]
        if (i === number.length - 3) {
            num += ','
        }
        if (i <= number.length - 4) {
            c++
            if (c % 2 === 0) {
            } else num += ','
        }
    }
    num = reve(num)
    return num
}

/***

const row = () => {

}
 
 */
