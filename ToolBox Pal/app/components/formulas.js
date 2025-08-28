export const formulas = [
    {
        id: 'area_rect',
        category: "Area",
        title: "Area of a Rectangle",
        formula: "A = length x width",
        fields: ["length", "width"],
        calculate: ({length, width}) => length * width,
    },
    {
        id: 'area_triangle',
        category: "Area",
        title: "Area of a Triangle",
        formula: "A = 1/2 base x height",
        fields: ["base", "height"],
        calculate: ({base, height}) => (1 / 2) * (base * height),
    },
    {
        id: 'area_square',
        category: "Area",
        title: "Area of a Square",
        formula: "A = side x side",
        fields: ["side"],
        calculate: ({side}) => Math.pow(side, 2),
    },
    {
        id: 'area_circle',
        category: "Area",
        title: "Area of a Circle",
        formula: "A = π x radius²",
        fields: ["radius"],
        calculate: ({radius}) => Math.PI * (Math.pow(radius, 2)),
    },
    {
        id: 'volume_cube',
        category: "Volume",
        title: "Volume of a Cube",
        formula: "V = side x side x side",
        fields: ["side"],
        calculate: ({side}) => (Math.pow(side, 3)),
    },
    {
        id: 'volume_sphere',
        category: "Volume",
        title: "Volume of a Sphere",
        formula: "V = 4/3 x π x radius³",
        fields: ["radius"],
        calculate: ({radius}) => (4 / 3) * Math.PI * (Math.pow(radius, 3)),
    },
    {
        id: 'volume_cone',
        category: "Volume",
        title: "Volume of a Cone",
        formula: "V = 1/3 x π x radius² x height",
        fields: ["radius", "height"],
        calculate: ({radius, height}) => (1 / 3) * Math.PI * (Math.pow(radius, 2)) * height,
    },
    {
        id: 'in_cm',
        category: "Conversion",
        isConvertible: true,
        convertbtn: " Inches ↔ Centimeters",
        title: "Inches to Centimeters",
        title2: "Centimeters to Inches",
        formula: "Cm = in x 2.54",
        form2: "In = cm ÷ 25.4",
        fields: ["inches"],
        fields2: ["centimeters"],  
        placeholders: {
            p1: {inches: 'inches'},   // normal
            p2: {centimeters: 'centimeters'} // reversed
        },
        calculate: ({inches}) => inches * 2.54,
        calculateReversed: ({centimeters}) => centimeters / 25.4,
    },   
    {
        id: 'ft_yd',
        category: "Conversion",
        isConvertible: true,
        convertbtn: " Feet ↔ Yards",
        title: "Feet to Yards",
        title2: "Yards to Feet",
        formula: "Yd = ft ÷ 3",
        form2: "Ft = yd x 3",
        fields: ["feet"],
        fields2: ["yards"],  
        placeholders: {
            p1: {feet: 'foot/feet'},   // normal
            p2: {yards: 'yard(s)'} // reversed
        },
        calculate: ({feet}) => feet / 3,
        calculateReversed: ({yards}) => yards * 3,
    },
    {
        id: 'ft_m',
        category: "Conversion",
        isConvertible: true,
        convertbtn: " Feet ↔ Meters",
        title: "Feet to Meters",
        title2: "Meters to Feet",
        formula: "M = ft x 0.3048",
        form2: "Ft = m x 3.280",
        fields: ["feet"],
        fields2: ["meters"],
        placeholders: {
            p1: {feet: 'foot/feet'},   // normal
            p2: {meters: 'meter(s)'} // reversed
        },
        calculate: ({feet}) => feet * 0.3048,
        calculateReversed: ({meters}) => meters * 3.280,
    },
    {
        id: 'lb_kg',
        category: "Conversion",
        isConvertible: true,
        convertbtn: " Pounds ↔ Kilograms",
        title: "Pounds to Kilograms",
        title2: "Kilograms to Pounds",
        formula: "kg = lb x 2.2",
        form2: "lb = kg ÷ 2.2",
        fields: ["pounds"],
        fields2: ["kilograms"],
        placeholders: {
            p1: {pounds: 'pound(s)'},   // normal
            p2: {kilograms: 'kilogram(s)'} // reversed
        },
        calculate: ({pounds}) => pounds * 2.2,
        calculateReversed: ({kilograms}) => kilograms / 2.2,
    },
    {
        id: 'lb_oz',
        category: "Conversion",
        isConvertible: true,
        convertbtn: " Pounds ↔ Ounces",
        title: "Pounds to Ounces",
        title2: "Ounces to Pounds",
        formula: "oz = lb x 16",
        form2: "lb = oz ÷ 16",
        fields: ["pounds"],
        fields2: ["ounces"],
        placeholders: {
            p1: {pounds: 'pound(s)'},   // normal
            p2: {ounces: 'ounce(s)'} // reversed
        },
        calculate: ({pounds}) => pounds * 16,
        calculateReversed: ({ounces}) => ounces / 16,
    },
];