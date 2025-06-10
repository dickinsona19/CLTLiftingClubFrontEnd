import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  min-height: 100vh;
  padding: 6rem 2rem;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)),
    url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')
    no-repeat center/cover fixed;
  color: white;
`;

const Content = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 3rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: white;
`;

const LastUpdated = styled.p`
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 2rem;
  font-size: 0.9rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
`;

const Paragraph = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const List = styled.ul`
  list-style-type: disc;
  margin-left: 1.5rem;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.8);
  
  li {
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }
`;

const TermsAndConditions = () => {
  return (
<Container>
  <Content
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <Title>Terms and Conditions</Title>
    <LastUpdated>Last Updated: March 17, 2025</LastUpdated>

    <Section>
      <Paragraph>
        By accessing or using the facilities, services, website, or mobile application (collectively, the “Services”) provided by CLT Lifting Club, a fitness company headquartered in Charlotte, North Carolina (collectively referred to as “we,” “us,” or “CLT Lifting Club”), including by registering as a member or guest, you expressly agree to and are legally bound by these Terms and Conditions (“Terms”). If you do not agree to these Terms, you must immediately cease using our Services and refrain from signing up for a membership.
      </Paragraph>
      <Paragraph>
        <strong>THESE TERMS INCLUDE:</strong><br />
        • A BINDING ARBITRATION PROVISION AND CLASS ACTION WAIVER THAT WILL GOVERN ANY CLAIM OR DISPUTE YOU MAY HAVE WITH CLT LIFTING CLUB (SEE SECTION 18).<br />
        • INFORMATION ON PAYMENT PROCESSING THROUGH STRIPE (SEE SECTION 12).<br />
        • HEALTH AND SAFETY DISCLAIMERS (SEE SECTION 1).
      </Paragraph>
      <Paragraph>
        The CLT Lifting Club Privacy Policy governs personal information we collect through our Services and is incorporated into these Terms. To the extent the provisions of the Privacy Policy conflict with these Terms, these Terms shall govern. THE SERVICES ARE AVAILABLE ONLY TO INDIVIDUALS AND ENTITIES THAT CAN FORM LEGALLY BINDING CONTRACTS UNDER APPLICABLE LAW. WITHOUT LIMITING THE FOREGOING, THE SERVICES ARE NOT AVAILABLE TO MINORS UNDER THE AGE OF 18.
      </Paragraph>
      <Paragraph>
        <strong>MODIFICATION OF THESE TERMS.</strong> We reserve the right, in our sole discretion, to change, modify, add, or remove the terms, conditions, and notices under which the Services are offered. These Terms may not be modified except by a revised Terms posted by CLT Lifting Club on our website (cltliftingclub.com) or a written amendment signed by an authorized representative of CLT Lifting Club. We will post notice of the updated Terms on our website homepage.
      </Paragraph>
    </Section>

    <Section>
      <SectionTitle>1. Health and Medical Concerns</SectionTitle>
      <Paragraph>
        CLT Lifting Club provides access to fitness facilities, equipment, and exercise-related services. You acknowledge and agree that the following warnings and disclaimers apply to all such services.
      </Paragraph>
      <Paragraph>
        <strong>THE INFORMATION AND SERVICES PROVIDED BY CLT LIFTING CLUB ARE IN NO WAY INTENDED AS OR A SUBSTITUTE FOR PROFESSIONAL MEDICAL ADVICE, DIAGNOSIS, OR TREATMENT.</strong>
      </Paragraph>
      <Paragraph>
        This information and these Services should only be used in conjunction with the guidance and care of your physician or healthcare provider. Consult your physician or healthcare provider before beginning or participating in any fitness or exercise program or using any equipment or services offered by CLT Lifting Club. Your physician should allow for proper follow-up visits and individualize your fitness plan as appropriate. Always seek the advice of your physician or other qualified healthcare provider if you have any questions regarding a medical condition, an exercise regimen, or any other health-related issues.
      </Paragraph>
      <Paragraph>
        CLT Lifting Club, its staff, and affiliates are not licensed medical care providers, are not rendering personal medical advice or treatment, and have no expertise in advising on, diagnosing, examining, or treating medical conditions of any kind, or in determining the effect of any specific exercise on a known or unknown medical condition.
      </Paragraph>
      <Paragraph>
        <strong>YOU ACKNOWLEDGE AND AGREE THAT WHEN PARTICIPATING IN ANY EXERCISE OR EXERCISE PROGRAM, AND/OR WHEN USING ANY FITNESS EQUIPMENT OR SERVICES, THERE IS THE POSSIBILITY OF PHYSICAL INJURY AND/OR DEATH, AND YOU ASSUME THE RISK AND RESPONSIBILITY FOR ANY SUCH RESULTS.</strong>
      </Paragraph>
      <Paragraph>
        You should never disregard medical advice or delay seeking it because of a statement you have read on our website or received through our Services. CLT Lifting Club should not be used in lieu of advice given by qualified medical professionals such as your doctor. It is imperative that you seek the advice of your doctor prior to using our Services if you know or suspect that you may be pregnant, have an eating disorder, have diabetes, or have any other physical or medical condition.
      </Paragraph>
      <Paragraph>
        <strong>Health Checklist:</strong> Before beginning any exercise program with CLT Lifting Club, consult with your doctor and consider the following non-exhaustive checklist:
      </Paragraph>
      <List>
        <li>Do you frequently experience chest pains after exercise?</li>
        <li>Do you get dizzy or faint during or after exercise?</li>
        <li>Are you breathless after mild exertion?</li>
        <li>Do you take medication for high blood pressure or a heart condition?</li>
        <li>Do you have joint, bone, or muscle problems that could be aggravated by exercise?</li>
        <li>Have you been physically inactive for an extended period?</li>
        <li>Do you have a medical condition (e.g., diabetes) that might require special attention during exercise?</li>
      </List>
      <Paragraph>
        <strong>IF YOU EXPERIENCE ANY DISCOMFORT OR PAIN DURING AN EXERCISE ROUTINE, YOU MUST IMMEDIATELY CEASE THE ACTIVITY AND SEEK THE ASSISTANCE OF A PHYSICIAN.</strong>
      </Paragraph>
    </Section>

    <Section>
      <SectionTitle>2. Membership Overview</SectionTitle>
      <Paragraph>
        CLT Lifting Club grants you a limited, revocable, non-transferable license to access our gym facilities and Services as a member, subject to these Terms. Your membership provides:
      </Paragraph>
      <List>
        <li>Access to our gym facilities, including equipment and designated workout areas.</li>
        <li>The ability to purchase additional products or services, such as personal training sessions.</li>
        <li>Use of our website and/or mobile application for account management and facility access.</li>
      </List>
      <Paragraph>
        We use Stripe, a third-party payment processor, to handle all membership fees and additional purchases. By signing up, you agree to link a valid payment card to your profile and authorize recurring charges as outlined in Section 12.
      </Paragraph>
    </Section>

    <Section>
      <SectionTitle>3. License and Access</SectionTitle>
      <List>
        <li>CLT Lifting Club grants you a limited license to access and use the Services solely for your individual, non-commercial use.</li>
        <li>This license does not include:</li>
        <List>
          <li>Any resale or commercial use of the Services or their contents.</li>
          <li>Any collection or use of member data, pricing, or facility descriptions for commercial purposes.</li>
          <li>Any derivative use of the Services or their contents.</li>
          <li>Any use of data mining, robots, or similar data-gathering tools.</li>
        </List>
        <li>The Services or any portion thereof may not be reproduced, duplicated, copied, sold, resold, or otherwise exploited for any commercial purpose without the express prior written consent of CLT Lifting Club.</li>
      </List>
    </Section>

    <Section>
      <SectionTitle>4. No Unlawful or Prohibited Use</SectionTitle>
      <Paragraph>
        As a condition of your use of the Services, you warrant that you will not use the Services for any purpose that is unlawful or prohibited by these Terms. You agree to comply with all applicable laws, including but not limited to privacy laws, intellectual property laws, and local regulations.
      </Paragraph>
      <Paragraph>
        You will use the Services in a professional and respectful manner and may not:
      </Paragraph>
      <List>
        <li>Damage, disable, overburden, or impair the Services or interfere with any other member’s use and enjoyment of the Services.</li>
        <li>Attempt to gain unauthorized access to any materials, systems, or information not intentionally made available through the Services.</li>
        <li>Use any robot, spider, or other automatic device to monitor or copy the Services or their contents.</li>
        <li>Engage in any conduct that could create liability for CLT Lifting Club or cause us to lose the services of our suppliers or partners.</li>
      </List>
      <Paragraph>
        If you gain access to information or materials not intended for you, you agree to immediately notify us at support@cltliftingclub.com and destroy all copies of such information in your possession.
      </Paragraph>
    </Section>

    <Section>
      <SectionTitle>5. Your Account</SectionTitle>
      <List>
        <li>To access certain Services, such as facility entry or online features, you may be required to create an account with associated login credentials.</li>
        <li>You agree to:</li>
        <List>
          <li>Provide true, accurate, and current information when creating and updating your account.</li>
          <li>Maintain the confidentiality of your login credentials and accept full responsibility for all activities under your account, whether authorized by you or not.</li>
          <li>Notify CLT Lifting Club immediately at support@cltliftingclub.com if you suspect unauthorized use of your account or a breach of security.</li>
        </List>
        <li>We reserve the right to deny the creation of, suspend access to, or terminate any account(s), or to remove or modify content or features available to account holders, at any time in our sole discretion and without prior notice or liability to you.</li>
      </List>
    </Section>

    <Section>
      <SectionTitle>6. Facility Access & Rules</SectionTitle>
      <List>
        <li><strong>Access:</strong> Members can enjoy gym facilities from 5 AM to 9 PM with their authorized credentials (e.g., key fob, mobile app code). Access is limited to the member and may not be shared with non-members.</li>
        <li><strong>Safety Protocols:</strong> All members must follow gym safety protocols and equipment usage guidelines, including but not limited to proper attire, equipment handling, and cleaning procedures. Failure to comply may result in suspension or termination of membership.</li>
        <li><strong>Personal Training:</strong> Personal training services are available at an additional cost and are subject to separate agreements with certified trainers.</li>
        <li><strong>Guest Policy:</strong> Guests are not permitted unless explicitly authorized by CLT Lifting Club in writing. Members are responsible for the conduct of any approved guests.</li>
        <li><strong>Prohibited Conduct:</strong> Smoking, alcohol, illegal substances, weapons, and disruptive behavior are strictly prohibited within the facilities.</li>
      </List>
    </Section>

    <Section>
      <SectionTitle>7. Payment Terms</SectionTitle>
      <List>
      <li><strong>Membership Fees:</strong> A one-time signup fee of $50.00 is charged at registration. Membership fees are charged monthly on your signup date via Stripe at a locked-in rate of either $89.99/month, $99.99/month, or $109.99/month, plus a 5% tax/tech fee. Alternatively, an annual payment option of $948.00 is available with no tax. Additionally, a $59.99 charge applies every 6 months after account creation. The current fee structure will be provided at signup and may be updated at the owner's discretion.</li><li><strong>Non-Refundable:</strong> Fees are non-refundable except as outlined in our cancellation policy (Section 8).</li>
        <li><strong>Failed Payments:</strong> If a payment fails, we will attempt to reprocess it. Persistent failure may result in membership suspension until resolved. You are responsible for any fees incurred due to failed payment attempts.</li>
        <li><strong>Late Fees:</strong> Late payments may incur a fee of $10 per attempt, communicated via email to the address on file.</li>
        <li><strong>Authorization:</strong> By providing payment information, you authorize CLT Lifting Club and Stripe to charge your card for all applicable fees, including membership dues and additional services.</li>
      </List>
    </Section>

    <Section>
      <SectionTitle>8. Cancellation Policy</SectionTitle>
      <List>
        <li><strong>Notice Period:</strong> A 30-day written notice is required for membership cancellation. Submit cancellation requests to support@cltliftingclub.com.</li>
        <li><strong>No Refunds:</strong> No refunds will be issued for partial months or unused portions of your membership.</li>
        <li><strong>Suspension/Termination:</strong> We reserve the right to suspend or terminate your membership for violation of gym rules, non-payment, or disruptive behavior, with no refund provided.</li>
        <li><strong>Post-Cancellation Access:</strong> Upon cancellation, access to the facilities will cease at the end of the billing cycle for which payment has been received.</li>
      </List>
    </Section>

    <Section>
      <SectionTitle>9. SMS Communications</SectionTitle>
      <Paragraph>
        By providing your mobile number during signup, you consent to receive non-marketing/transactional and marketing text messages from CLT Lifting Club, including messages sent via an automatic telephone dialing system. Message and data rates may apply.
      </Paragraph>
      <List>
        <li><strong>Opt-Out:</strong> Text STOP to opt out at any time. You will receive a confirmation message, after which no further texts will be sent except as required for membership transactions.</li>
        <li><strong>Responsibility:</strong> You represent that you are the account holder for the provided mobile number and will notify us immediately at support@cltliftingclub.com if it changes.</li>
      </List>
    </Section>

    <Section>
      <SectionTitle>10. Links to Third-Party Sites</SectionTitle>
      <Paragraph>
        Our website or app may contain links to third-party sites (e.g., Stripe for payments). We are not responsible for the content, privacy practices, or availability of these sites. Use them at your own risk and review their terms and policies.
      </Paragraph>
    </Section>

    <Section>
      <SectionTitle>11. Disclaimers and Limitation of Liability</SectionTitle>
      <Paragraph>
        <strong>CLT LIFTING CLUB PROVIDES ITS SERVICES ON AN “AS IS” AND “AS AVAILABLE” BASIS. YOU USE OUR SERVICES AT YOUR OWN RISK.</strong>
      </Paragraph>
      <Paragraph>
        We make no warranties about the suitability, reliability, availability, or safety of our facilities, equipment, or Services. To the maximum extent permitted by law, we disclaim all warranties, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.
      </Paragraph>
      <Paragraph>
        <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW, CLT LIFTING CLUB AND ITS AFFILIATES SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING FROM YOUR USE OF THE SERVICES, INCLUDING INJURY, LOSS OF DATA, OR PROPERTY DAMAGE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</strong>
      </Paragraph>
    </Section>

    <Section>
      <SectionTitle>12. Payments via Stripe</SectionTitle>
      <Paragraph>
        We use Stripe for payment processing. By linking your payment card, you agree to Stripe’s terms of service (available at stripe.com/legal). We are not responsible for Stripe’s practices or any issues arising from their services.
      </Paragraph>
    </Section>

    <Section>
      <SectionTitle>13. Indemnification</SectionTitle>
      <Paragraph>
        You agree to indemnify, defend, and hold harmless CLT Lifting Club, its affiliates, officers, employees, and agents from any claims, damages, or losses arising from your use of the Services, violation of these Terms, or infringement of any third-party rights.
      </Paragraph>
    </Section>

    <Section>
      <SectionTitle>14. Termination/Access Restriction</SectionTitle>
      <Paragraph>
        We reserve the right to terminate or restrict your access to the Services at any time, for any reason, without notice, including for violations of these Terms or disruptive behavior.
      </Paragraph>
    </Section>

    <Section>
      <SectionTitle>15. Copyright and Trademark Notices</SectionTitle>
      <Paragraph>
        All content on our website, app, and facilities (e.g., logos, text, images) is owned by CLT Lifting Club or its licensors and protected by U.S. and international copyright laws. Unauthorized use is prohibited.
      </Paragraph>
    </Section>

    <Section>
      <SectionTitle>16. International Use</SectionTitle>
      <Paragraph>
        You are responsible for complying with all applicable laws in your jurisdiction regarding the use of our Services.
      </Paragraph>
    </Section>

    <Section>
      <SectionTitle>17. Mobile Application Users</SectionTitle>
      <Paragraph>
        If you use our mobile app, these Terms apply. You are responsible for all charges incurred from your mobile carrier. We may update or discontinue the app at any time without notice.
      </Paragraph>
    </Section>

    <Section>
      <SectionTitle>18. Arbitration; Waiver of Jury Trial and Class Action</SectionTitle>
      <Paragraph>
        <strong>ALL DISPUTES BETWEEN YOU AND CLT LIFTING CLUB WILL BE RESOLVED BY BINDING INDIVIDUAL ARBITRATION. YOU WAIVE YOUR RIGHT TO A JURY TRIAL OR TO PARTICIPATE IN A CLASS ACTION.</strong>
      </Paragraph>
      <List>
        <li><strong>Arbitration Process:</strong> Disputes will be governed by the American Arbitration Association (AAA) Consumer Arbitration Rules (adr.org/consumer) and held before a single arbitrator in Charlotte, NC, or via telephone if requested. New York law applies without regard to conflict of laws.</li>
        <li><strong>Costs:</strong> Each party bears its own costs, with administrative fees split equally.</li>
        <li><strong>Initiation:</strong> Send arbitration requests to support@cltliftingclub.com and the AAA.</li>
        <li><strong>Exceptions:</strong> Small claims court actions or intellectual property disputes may proceed in court.</li>
      </List>
    </Section>

    <Section>
      <SectionTitle>19. Contact Information</SectionTitle>
      <Paragraph>
        For questions or concerns, contact us at:<br />
        Email: cltlifting@cltliftingclub.com<br />
        Phone: (704) 785-5797<br />
        Address: CLT Lifting Club, 3100 South Blvd, Charlotte, NC 28203
      </Paragraph>
    </Section>
  </Content>
</Container>
  );
};

export default TermsAndConditions;