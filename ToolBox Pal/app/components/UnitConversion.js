// UnitConversion.js
import socketSizes from './socket_sizes.json';

  // Convert Metric to Imperial
  export const convertMetricToImperial = (mm) => {
    const inches = mm / 25.4; // mm to inches
    const fraction = convertToFraction(inches);
    return { inches: inches, fraction: fraction };//`${inches.toFixed(3)} (${convertToFraction(inches)})"`; // Show decimal and fraction
  };

  // Convert Imperial to Metric
  export const convertImperialToMetric = (inches) => {
    return inches * 25.4; // inches to mm
  };

// Helper function to convert decimal inches to a fraction
const convertToFraction = (decimalInch) => {
    const fractions = [
        { fraction: "1/32", value: 1 / 32 },
        { fraction: "1/16", value: 1 / 16 },
        { fraction: "3/32", value: 3 / 32 },
        { fraction: "1/8", value: 1 / 8 },
        { fraction: "5/32", value: 5 / 32 },
        { fraction: "3/16", value: 3 / 16 },
        { fraction: "7/32", value: 7 / 32 },
        { fraction: "1/4", value: 1 / 4 },
        { fraction: "9/32", value: 9 / 32 },
        { fraction: "5/16", value: 5 / 16 },
        { fraction: "11/32", value: 11 / 32 },
        { fraction: "3/8", value: 3 / 8 },
        { fraction: "13/32", value: 13 / 32 },
        { fraction: "7/16", value: 7 / 16 },
        { fraction: "15/32", value: 15 / 32 },
        { fraction: "1/2", value: 1 / 2 },
        { fraction: "9/16", value: 9 / 16 },
        { fraction: "5/8", value: 5 / 8 },
        { fraction: "11/16", value: 11 / 16 },
        { fraction: "3/4", value: 3 / 4 },
        { fraction: "13/16", value: 13 / 16 },
        { fraction: "7/8", value: 7 / 8 },
        { fraction: "15/16", value: 15 / 16 },
        { fraction: "1", value: 1 }
    ];

    let closestFraction = "";
    let minDiff = Infinity;

    fractions.forEach(({ fraction, value }) => {
        const diff = Math.abs(decimalInch - value);
        if (diff < minDiff) {
            minDiff = diff;
            closestFraction = fraction;
        }
    });

    return closestFraction;
};
