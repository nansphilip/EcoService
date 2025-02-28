"use client";

import { combo } from "@lib/combo";
import { FilterContext } from "./FilterProvider";

import { CategoryType } from "@actions/types/Category";
import { ChangeEventHandler, ReactNode, useContext } from "react";
import { ItemsPerPageParamType, PriceOrderParamType } from "./FilterTypes";

type FilterSelectClientProps = {
    categoryList: CategoryType[];
};

export default function FilterSelectClient(props: FilterSelectClientProps) {
    const { categoryList } = props;

    const {
        setProductList,
        priceOrder,
        setPriceOrder,
        page,
        setPage,
        take,
        setTake,
        category,
        setCategory,
        productAmount,
    } = useContext(FilterContext);

    const divClass = "w-1/4 space-y-2";
    const labelClass = "text-sm text-gray-500 text-gray-200 ";
    const selectClass = "rounded-md border p-2 text-gray-700 shadow-sm w-full";

    return (
        <div className="flex flex-row items-center justify-start gap-4 bg-primary px-6 py-4">
            <Select
                label="Catégorie"
                divClass={divClass}
                labelClass={labelClass}
                selectClass={selectClass}
                onChange={(e) => {
                    setPage(1);
                    setProductList("isLoading");
                    setCategory(e.target.value);
                }}
                value={category}
            >
                <option value="">Toutes</option>
                {categoryList.map((category, index) => (
                    <option key={index} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </Select>
            <Select
                label="Trier par prix"
                divClass={divClass}
                labelClass={labelClass}
                selectClass={selectClass}
                onChange={(e) => {
                    setProductList("isLoading");
                    setPriceOrder(
                        e.target.value as PriceOrderParamType["priceOrder"],
                    );
                }}
                value={priceOrder}
            >
                <option value="not">Non trié</option>
                <option value="asc">Prix croissant</option>
                <option value="desc">Prix décroissant</option>
            </Select>
            <Select
                label="Page"
                divClass={divClass}
                labelClass={labelClass}
                selectClass={selectClass}
                onChange={(e) => {
                    setProductList("isLoading");
                    setPage(Number(e.target.value));
                }}
                value={page}
            >
                {Array.from(
                    { length: Math.ceil(productAmount / take) },
                    (_, index) => (
                        <option key={index + 1} value={index + 1}>
                            {index + 1}
                        </option>
                    ),
                )}
            </Select>
            <Select
                label="Produits par page"
                divClass={divClass}
                labelClass={labelClass}
                selectClass={selectClass}
                onChange={(e) => {
                    setPage(1);
                    setProductList("isLoading");
                    setTake(
                        Number(e.target.value) as ItemsPerPageParamType["take"],
                    );
                }}
                value={take}
            >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </Select>
        </div>
    );
}

type SelectProps = {
    label: string;
    onChange: ChangeEventHandler<HTMLSelectElement>;
    value: string | number;
    divClass?: string;
    labelClass?: string;
    selectClass?: string;
    children: ReactNode;
};

const Select = (props: SelectProps) => {
    const {
        label,
        onChange,
        value,
        divClass,
        labelClass,
        selectClass,
        children,
    } = props;

    return (
        <label className={combo(divClass)}>
            <div className={combo("text-sm text-gray-500", labelClass)}>
                {label}
            </div>
            <select
                className={combo(
                    "rounded-md border p-2 text-gray-700 shadow-sm",
                    selectClass,
                )}
                onChange={onChange}
                value={value}
            >
                {children}
            </select>
        </label>
    );
};
