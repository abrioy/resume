import styles from "@/src/content/en/resume/resume.module.css";
import Header from "@/src/components/commons/header";
import Intro from "@/src/content/en/resume/intro.mdx";
import Skills from "@/src/content/en/resume/skills.mdx";
import SkillsSecondary from "@/src/content/en/resume/skills-secondary.mdx";
import Training from "@/src/content/en/resume/training.mdx";
import stylesTimeline from "@/src/content/en/resume/resume-timeline.module.css";
import Experience from "@/src/content/en/resume/experience.mdx";
import { VariantDocumentComponentArgs } from "@/src/model/configuration.model";

export default function EnglishResume({
  variant,
  components,
}: VariantDocumentComponentArgs) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <header className={styles.resume}>
        <Header variant={variant}>
          <Intro components={components}></Intro>
        </Header>
      </header>
      <main className={styles.resume}>
        <section className={styles.body}>
          <section className={styles.skills}>
            <section>
              <Skills components={components}></Skills>
            </section>
            <section className={styles.secondary}>
              <SkillsSecondary components={components}></SkillsSecondary>
            </section>
            <section className={styles.training}>
              <Training components={components}></Training>
            </section>
          </section>
          <section className={stylesTimeline.timeline}>
            <Experience components={components}></Experience>
          </section>
        </section>
      </main>
    </div>
  );
}
