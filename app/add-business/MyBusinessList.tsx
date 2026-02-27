"use client";
import Link from "next/link";
export  function MyBusinessList({businessList,handleDelete,handleUpdate}){
    
    return(
        <div className="business-container">
            <h1 className="business-list-header">My Business</h1>
            <div className="business-grid">
                
            { businessList?.length === 0 

                ? "No Business found" :
                
            businessList.data.data.map((business: any) => (
            // <Link key={business.id} href={"/business/" + business.id}>
                <div key={business.id} className="business-card">
                {business.logo?.url && (
                    <div className="imageWrapper">
                    <img
                        src={business.logo.url}
                        alt={business.name}
                        className="image"
                    />
                    </div>
                )}

                <div className="cardContent">
                    <Link  href={"/business/" + business.id}>
                        <h2 className="title">{business.name}</h2>
                    </Link>

                    <p className="location">
                    {business.address_1?.city}, {business.address_1?.state}
                    </p>

                    <p className="service">
                    {business.services?.title}
                    </p>

                    <span
                        className={
                            business.is_business_open
                            ? "openBadge"
                            : "closedBadge"
                        }
                    >
                        {business.is_business_open ? "Open" : "Closed"}
                    </span>
                    <div className="action-buttons">
                        <button className="btn-upd-business" value={business.id} onClick={(e) => handleUpdate(e.target.value)}>Update</button>
                        <button className="btn-del-business" value={business.id} onClick={(e) => handleDelete(e.target.value)}>Delete</button>
                    </div>
                </div>
                </div>
            // </Link>
            ))}
        </div>
    </div>
    )
}