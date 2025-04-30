import React, { useState, useRef, useEffect } from 'react';
import { Dumbbell, AlertCircle, CheckCircle2, Undo2, ChevronDown } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';


const SignWaiver = () => {
    const [searchParams] = useSearchParams();
    const userId = searchParams.get('userId');
    const isPotentialUser = searchParams.get('isPotentialUser') === 'true' || false;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasSignature, setHasSignature] = useState(false);
    const [hasAgreed, setHasAgreed] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [isWaiverExpanded, setIsWaiverExpanded] = useState(true);

    console.log(userId)
    useEffect(() => {
      const resizeCanvas = () => {
        if (canvasRef.current) {
          const canvas = canvasRef.current;
          const context = canvas.getContext('2d');
          
          const currentDrawing = canvas.toDataURL();
          
          const dpr = window.devicePixelRatio || 1;
          const rect = canvas.getBoundingClientRect();
          
          canvas.width = rect.width * dpr;
          canvas.height = rect.height * dpr;
          
          if (context) {
            context.scale(dpr, dpr);
            context.lineCap = 'round';
            context.lineJoin = 'round';
            context.lineWidth = 2;
            context.strokeStyle = '#1e40af';
            setCtx(context);
            
            if (hasSignature) {
              const img = new Image();
              img.onload = () => {
                context.drawImage(img, 0, 0, rect.width, rect.height);
              };
              img.src = currentDrawing;
            }
          }
        }
      };
  
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      return () => window.removeEventListener('resize', resizeCanvas);
    }, [hasSignature]);
  
    const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      if (!canvasRef.current) return { x: 0, y: 0 };
      
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      
      if ('touches' in e) {
        e.preventDefault();
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top
        };
      }
      
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
  
    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      if (!ctx) return;
      setIsDrawing(true);
      
      const { x, y } = getCoordinates(e);
      ctx.beginPath();
      ctx.moveTo(x, y);
    };
  
    const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      if (!isDrawing || !ctx) return;
      
      const { x, y } = getCoordinates(e);
      ctx.lineTo(x, y);
      ctx.stroke();
      setHasSignature(true);
    };
  
    const stopDrawing = () => {
      setIsDrawing(false);
      if (ctx) ctx.closePath();
    };
  
    const clearSignature = () => {
      if (!ctx || !canvasRef.current) return;
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setHasSignature(false);
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!hasSignature || !hasAgreed) return;
    
      const signatureData = canvasRef.current?.toDataURL("image/png");
    
      if (!signatureData) return;
    
      const blob = await (await fetch(signatureData)).blob();
      const formData = new FormData();
      formData.append("file", blob, "signature.png");
      if(isPotentialUser){try {
        const response = await fetch(`https://boss-lifting-club-api.onrender.com/api/potential-users/${userId}/waiver`, {
          method: 'POST',
          body: formData,
        });
    
        if (response.ok) {
          setSubmitted(true);
          console.log('Signature successfully submitted');
        } else {
          console.error('Failed to submit signature');
        }
      } catch (error) {
        console.error('Error submitting signature:', error);
      }
      }else{
      try {
        const response = await fetch(`https://boss-lifting-club-api.onrender.com/users/${userId}/waiver`, {
          method: 'POST',
          body: formData,
        });
    
        if (response.ok) {
          setSubmitted(true);
          console.log('Signature successfully submitted');
        } else {
          console.error('Failed to submit signature');
        }
      } catch (error) {
        console.error('Error submitting signature:', error);
      }

      window.location.href = 'cltliftingclub://?userId=' +userId;
    }
    };
    
    if (submitted) {
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
            <p className="text-gray-600">Your signed waiver has been successfully submitted.</p>
          </div>
        </div>
      );
    }
  
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Dumbbell className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800">CLT Lifting Club Waiver Form</h1>
            </div>
  
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                <p className="text-sm text-blue-700">
                  Please read this waiver carefully before signing. This waiver release form is a requirement for membership.
                </p>
              </div>
            </div>
  
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsWaiverExpanded(!isWaiverExpanded)}
                  className="flex items-center justify-between w-full text-left mb-4"
                >
                  <h3 className="text-lg font-semibold text-gray-800">Waiver and Release of Liability</h3>
                  <ChevronDown className={`w-5 h-5 transform transition-transform ${isWaiverExpanded ? 'rotate-180' : ''}`} />
                </button>
                
                <div className={`space-y-4 text-sm text-gray-600 ${isWaiverExpanded ? '' : 'hidden'}`}>
                  <p className="leading-relaxed">
                    By signing this Waiver and Release of Liability ("Waiver"), I acknowledge that I am voluntarily participating in physical exercise, weightlifting, fitness classes, and other related activities ("Activities") offered by CLT Lifting Club. I understand that participation in these Activities involves inherent risks, and I agree to the following terms:
                  </p>
  
                  <div className="space-y-4">
                    <section>
                      <h4 className="font-semibold text-gray-800 mb-2">1. Assumption of Risk</h4>
                      <p className="leading-relaxed">
                        I recognize that the Activities at CLT Lifting Club involve strenuous physical exertion and the use of equipment such as weights, barbells, resistance machines, and cardio equipment. I understand that these Activities carry inherent risks, including but not limited to: muscle strains, sprains, fractures, joint dislocations, or other physical injuries; cardiovascular complications, including heart attack, stroke, or irregular heartbeat; slip-and-fall accidents, collisions with other members, or equipment-related injuries; illness or injury from overexertion, dehydration, improper technique, or fatigue; risks associated with shared facilities, including exposure to bacteria, viruses (e.g., COVID-19), or other pathogens; injuries from dropped weights or malfunctioning equipment. I knowingly and freely assume all such risks, both known and unknown, even if arising from the negligence of CLT Lifting Club, its owners, employees, trainers, agents, affiliates, or other members (collectively, "Releasees"), and I accept full responsibility for my participation.
                      </p>
                    </section>
  
                    <section>
                      <h4 className="font-semibold text-gray-800 mb-2">2. Physical Condition and Health Responsibility</h4>
                      <p className="leading-relaxed">
                        I certify that I am physically fit and have no medical conditions, injuries, or disabilities that would prevent my safe participation in the Activities. I agree to consult a physician before beginning any exercise program at CLT Lifting Club if I have any doubts about my health or fitness level. I will immediately cease participation and notify staff if I experience symptoms such as dizziness, chest pain, shortness of breath, or unusual fatigue. I acknowledge that CLT Lifting Club is not responsible for providing medical advice or diagnosing health conditions.
                      </p>
                    </section>
  
                    <section>
                      <h4 className="font-semibold text-gray-800 mb-2">3. Release and Waiver of Liability</h4>
                      <p className="leading-relaxed">
                        In consideration of being permitted to participate in the Activities and use CLT Lifting Club's facilities, equipment, and services, I hereby release, waive, discharge, and covenant not to sue the Releasees from any and all liability, claims, demands, actions, or causes of action arising out of or related to any loss, damage, or injury, including death, that may be sustained by me, or to any property belonging to me, whether caused by the negligence of the Releasees or otherwise, while participating in the Activities, on CLT Lifting Club premises, or using its equipment or services.
                      </p>
                    </section>
  
                    <section>
                      <h4 className="font-semibold text-gray-800 mb-2">4. Indemnification</h4>
                      <p className="leading-relaxed">
                        I agree to indemnify, defend, and hold harmless the Releasees from any loss, liability, damage, or costs, including attorney fees and court costs, that they may incur due to my participation in the Activities, whether caused by my negligence, intentional acts, or otherwise.
                      </p>
                    </section>
  
                    <section>
                      <h4 className="font-semibold text-gray-800 mb-2">5. Use of Equipment and Facilities</h4>
                      <p className="leading-relaxed">
                        I agree to use all equipment and facilities at my own risk and in accordance with any instructions or rules provided by CLT Lifting Club staff. I will inspect equipment prior to use and report any damaged, defective, or malfunctioning equipment to staff immediately. I will not attempt to repair equipment myself. I understand that CLT Lifting Club is not liable for injuries caused by my misuse of equipment or failure to follow posted guidelines.
                      </p>
                    </section>
  
                    <section>
                      <h4 className="font-semibold text-gray-800 mb-2">6. No Drugs or Prohibited Substances</h4>
                      <p className="leading-relaxed">
                        I agree that no illegal drugs, controlled substances, or performance-enhancing drugs, including but not limited to anabolic steroids, human growth hormones, or stimulants, shall be used, possessed, sold, or distributed on CLT Lifting Club premises or during any Activities. Violation of this policy will result in immediate termination of my membership without refund and may lead to legal action. I acknowledge that CLT Lifting Club maintains a zero-tolerance policy for such activities to ensure a safe and fair environment for all members.
                      </p>
                    </section>
  
                    <section>
                      <h4 className="font-semibold text-gray-800 mb-2">7. Conduct and Safety Rules</h4>
                      <p className="leading-relaxed">
                        I agree to abide by all CLT Lifting Club rules, policies, and staff instructions, including but not limited to: proper attire (e.g., closed-toe athletic shoes, no sandals); cleaning equipment after use with provided sanitizing materials; not dropping weights unnecessarily or engaging in disruptive behavior; respecting other members' space and safety. Failure to comply may result in suspension or termination of my membership without refund.
                      </p>
                    </section>
  
                    <section>
                      <h4 className="font-semibold text-gray-800 mb-2">8. Emergency Procedures</h4>
                      <p className="leading-relaxed">
                        In the event of an emergency, I authorize CLT Lifting Club staff to administer first aid or seek medical assistance on my behalf. I understand that I am responsible for any associated medical costs and that CLT Lifting Club is not obligated to provide medical personnel or equipment beyond basic first aid.
                      </p>
                    </section>
  
                    <section>
                      <h4 className="font-semibold text-gray-800 mb-2">9. Media Release</h4>
                      <p className="leading-relaxed">
                        I grant CLT Lifting Club permission to use my likeness, photographs, videos, or audio recordings taken during Activities for promotional, marketing, or training purposes, without compensation, unless prohibited by law. I may opt out of this provision by providing written notice to CLT Lifting Club.
                      </p>
                    </section>
  
                    <section>
                      <h4 className="font-semibold text-gray-800 mb-2">10. Payment Authorization via Stripe</h4>
                      <p className="leading-relaxed">
                        I acknowledge that I have connected a payment method through Stripe to my CLT Lifting Club account. I authorize CLT Lifting Club to charge my connected Stripe account for: recurring membership fees as outlined in my selected membership plan (e.g., monthly, annual fees, or maintenance fee); additional products or services I utilize, including but not limited to personal training sessions, fitness classes, merchandise, supplements, or equipment rentals, at the rates disclosed at the time of purchase. I understand that charges will be processed automatically based on my usage and membership status, and I agree to keep my payment information current. I will be notified of any changes to membership fees at least 30 days in advance, where required by law. I acknowledge that failure to maintain a valid payment method may result in suspension or termination of my membership. Refunds for charges are subject to CLT Lifting Club's refund policy, available upon request.
                      </p>
                    </section>
  
                    <section>
                      <h4 className="font-semibold text-gray-800 mb-2">11. Membership Termination</h4>
                      <p className="leading-relaxed">
                        I understand that CLT Lifting Club reserves the right to terminate my membership at any time for violation of this Waiver, club rules, non-payment of fees, or behavior deemed unsafe or disruptive, with no refund of fees paid. I may terminate my membership by providing written notice to CLT Lifting Club, subject to the terms of my membership plan.
                      </p>
                    </section>
  
                    <section>
                      <h4 className="font-semibold text-gray-800 mb-2">12. Governing Law</h4>
                      <p className="leading-relaxed">
                        This Waiver shall be governed by and construed in accordance with the laws of the State of North Carolina. Any disputes arising under this Waiver shall be resolved exclusively in the courts of Mecklenburg County, North Carolina.
                      </p>
                    </section>
  
                    <section>
                      <h4 className="font-semibold text-gray-800 mb-2">13. Severability</h4>
                      <p className="leading-relaxed">
                        If any provision of this Waiver is found to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions shall remain in full force and effect.
                      </p>
                    </section>
  
                    <section>
                      <h4 className="font-semibold text-gray-800 mb-2">Acknowledgment of Understanding</h4>
                      <p className="leading-relaxed">
                        I have read this Waiver and Release of Liability in its entirety and fully understand its terms. I understand that I am giving up substantial rights, including my right to sue, and I sign it freely and voluntarily without any inducement, coercion, or misrepresentation. I am at least 18 years of age or have the consent of a parent or legal guardian to participate. If signing on behalf of a minor, I represent that I am the legal guardian with authority to bind the minor to these terms.
                      </p>
                    </section>
                  </div>
                </div>
              </div>
  
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Digital Signature
                </label>
                <div className="relative border-2 border-gray-300 rounded-lg">
                  <canvas
                    ref={canvasRef}
                    className="w-full h-32 touch-none cursor-crosshair"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                  />
                  <button
                    type="button"
                    onClick={clearSignature}
                    className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 bg-white rounded-full shadow-sm border border-gray-200"
                  >
                    <Undo2 className="w-4 h-4" />
                  </button>
                </div>
                {!hasSignature && (
                  <p className="text-sm text-red-500">Please sign above</p>
                )}
              </div>
  
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="hasAgreed"
                  checked={hasAgreed}
                  onChange={(e) => setHasAgreed(e.target.checked)}
                  required
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="hasAgreed" className="ml-2 block text-sm text-gray-700">
                  I have read, understood, and agree to the terms of this waiver. I understand that by checking this box and signing above, I am giving up substantial legal rights.
                </label>
              </div>
  
              <button
                type="submit"
                disabled={!hasSignature || !hasAgreed}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Waiver
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

export default SignWaiver