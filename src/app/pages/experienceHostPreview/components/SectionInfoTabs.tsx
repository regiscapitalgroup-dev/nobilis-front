import { useRef, useEffect, useState } from "react";
import { Enhancement, ExperienceSummaryModel } from "../../teamExperiences/models/ExperienceSummaryModel";

type Props = {
  experience: ExperienceSummaryModel;
};

export function SectionInfoTabs({ experience }: Props) {
    const [tabSelected, setTabSelected] = useState(1);
    const [more, setMore] = useState(false);
    const [showButton, setShowButton] = useState(false);

    const getCurrentText = () => {
        switch (tabSelected) {
        case 1:
            return experience?.itinerary || "";
        case 2:
            return experience?.whatIsIncluded || "";
        case 3:
            return experience?.importantInformationGuest || "";
        default:
            return "";
        }
    };

    const getDisplayedText = (text: string, long = 250) => {
        if (more) return text;
        if (text.length > long) return text.slice(0, long) + "...";
        return text;
    };

    useEffect(() => {
        const text = getCurrentText();
        setShowButton(text.length > 250);
        setMore(false); // reset when tab changes
    }, [tabSelected, experience]);

    const text = getCurrentText();

    const renderTab1 = () => {
        return (<div className="w-100 d-flex flex-md-row flex-column gap-100">
            <div className={`experience-preview-tab-content w-75`}>
                <p className="experience-preview-description-text">
                    {getDisplayedText(text)}
                </p>
                {showButton && (
                    <button className="experience-preview-readmore" onClick={() => setMore(!more)}>
                        Read {more ? "less" : "more"}
                    </button>)}
            </div>
        </div>)
    }

    const renderTab2 = () => {
        return (<div className="w-100 d-flex flex-md-row flex-column gap-100">
            <div className={`experience-preview-tab-content w-50`}>
                <div className="experience-preview-included-title">Whats Included</div>
                <p className="experience-preview-description-text">
                    {getDisplayedText(text)}
                </p>
                {showButton && (
                    <button className="experience-preview-readmore" onClick={() => setMore(!more)}>
                        Read {more ? "less" : "more"}
                    </button>)}
            </div>
            <div className={`experience-preview-tab-content w-50`}>
                <div className="experience-preview-optional-wrapper w-100">
                    <div className="experience-preview-optional-title">Optional</div>
                        {(experience.enhancements ?? []).map((item:Enhancement,index:number)=>(
                            <div key={`optional-${index}`} className="experience-preview-optional-card">
                                <div className="experience-preview-optional-card-title">{item.name}</div>
                                <div className="experience-preview-optional-card-price">${item.price} / group</div>
                            </div>
                        ))}
                </div>
            </div>
        </div>);
    }

    const renderTab3 = () => {
        return (<div className="w-100 d-flex flex-md-row flex-column gap-100">
            <div className={`experience-preview-tab-content w-50`}>
                <div className="experience-preview-included-title">Guest Preparation & Additional Notes</div>
                <p className="experience-preview-description-text">
                    {getDisplayedText(text)}
                </p>
                {showButton && (
                    <button className="experience-preview-readmore" onClick={() => setMore(!more)}>
                        Read {more ? "less" : "more"}
                    </button>)}
            </div>
            <div className={`experience-preview-tab-content w-50`}>
                <div className="experience-preview-optional-wrapper w-100">
                    <div className="experience-preview-optional-title">ideal for</div>

                    <p className="experience-preview-description-text">
                        {experience.idealAudience}
                    </p>
                </div>
            </div>
        </div>);
    }

    return (<div className="experience-preview-tabs-section">
        <div className="experience-preview-tabs">
            <div className={`experience-preview-tab ${tabSelected == 1 ? 'experience-preview-tab--active' : ''}`} onClick={()=>setTabSelected(1)}>
                <span>Description</span>
            </div>

            <div className={`experience-preview-tab ${tabSelected == 2 ? 'experience-preview-tab--active' : ''}`} onClick={()=>setTabSelected(2)}>
                <span>Included / Optional</span>
            </div>

            <div className={`experience-preview-tab ${tabSelected == 3 ? 'experience-preview-tab--active' : ''}`} onClick={()=>setTabSelected(3)}>
                <span>Additional info</span>
            </div>
        </div>

        {/* Content */}
        {tabSelected === 1 && (renderTab1())}
        {tabSelected === 2 && (renderTab2())}
        {tabSelected === 3 && (renderTab3())}
    </div>);
}