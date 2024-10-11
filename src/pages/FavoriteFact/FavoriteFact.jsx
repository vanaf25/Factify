import React from 'react';
import Facts from "../../components/Facts/Facts"; // Using react-icons for better integration

const FavoriteFact = () => {
    const facts = [
        { title: "Climate change is a hoax", status: "false" },
        { title: "Vaccines cause autism", status: "false" },
        { title: "5G technology spreads COVID-19", status: "false" },
        { title: "Misleading health supplements", status: "misleading" },
        { title: "Electric cars reduce emissions", status: "true" },
        { title: "Vaccine side effects", status: "partially-true" },
        { title: "Organic food is healthier", status: "partially-true" },
        { title: "Eating fat makes you fat", status: "false" },
        { title: "Drinking coffee stunts growth", status: "false" },
        { title: "Cell phones cause cancer", status: "misleading" },
        { title: "Homeopathy is effective", status: "misleading" },
        { title: "Carbs are bad for you", status: "partially-true" },
        { title: "Gluten is unhealthy for everyone", status: "false" },
        { title: "Detox diets are necessary", status: "misleading" },
        { title: "Mental health issues are not real", status: "false" },
    ];
    return (
        <main className="flex-1 p-8 overflow-y-auto ml-16 bg-bg">
            <h2 className="text-2xl text-primary mb-6">Favorite Facts</h2>
            <Facts facts={facts}/>
        </main>
    );
};

export default FavoriteFact;
