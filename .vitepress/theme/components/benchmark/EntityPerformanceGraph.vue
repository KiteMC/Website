<script setup>
import { ref, onMounted } from 'vue';

// Performance comparison data
const performanceData = [
  {
    name: 'Default Config',
    SurviveX: 2.8,
    Paper: 3.7,
    SurviveXAsync: null, // No async data for this scenario
    SurviveXImprovement: ((3.7 - 2.8) / 3.7 * 100).toFixed(1)
  },
  {
    name: 'Increased Mob Caps',
    SurviveX: 5.8,
    Paper: 8.1,
    SurviveXAsync: 4.5,
    SurviveXImprovement: ((8.1 - 5.8) / 8.1 * 100).toFixed(1),
    asyncImprovement: ((8.1 - 4.5) / 8.1 * 100).toFixed(1)
  }
];

// Environment details
const environment = {
  SurviveXCommit: '9db6bfb',
  paperCommit: 'a838a88',
  seed: '2618050634530417871',
  coords: '183.5 67.00 -201.5',
  version: '1.21.4',
  cpu: 'i7-10750H',
  jvm: 'GraalVM 21',
  memory: '6GB'
};

// Aikar's flags
const jvmFlags = `-Xms6144M -Xmx6144M --add-modules=jdk.incubator.vector -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true -XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20`;

// Calculate maximum MSPT value for scaling
const maxMspt = Math.max(
  ...performanceData.map(d => Math.max(d.Paper, d.SurviveX, d.SurviveXAsync || 0))
);

// Calculate the scale factor for bar heights (pixels per mspt)
// We'll aim for the tallest bar to be about 160px tall
const scaleFactor = 160 / maxMspt;

// Animation control
const animationStarted = ref(false);
const showBars = ref(false);
const showNumbers = ref(false);
const showImprovements = ref(false);

// Counter for animated numbers
const animatedValues = ref(
  performanceData.map(data => ({
    Paper: 0,
    SurviveX: 0,
    SurviveXAsync: data.SurviveXAsync ? 0 : null,
    SurviveXImprovement: 0,
    asyncImprovement: data.asyncImprovement ? 0 : null
  }))
);

// Function to animate counting up
function animateCounters() {
  const duration = 1500; // Animation duration in ms
  const fps = 60;
  const frames = duration * fps / 1000;
  
  // Clone target values
  const targets = performanceData.map(data => ({
    Paper: data.Paper,
    SurviveX: data.SurviveX,
    SurviveXAsync: data.SurviveXAsync,
    SurviveXImprovement: parseFloat(data.SurviveXImprovement),
    asyncImprovement: data.asyncImprovement ? parseFloat(data.asyncImprovement) : null
  }));
  
  let frame = 0;
  
  const interval = setInterval(() => {
    frame++;
    const progress = frame / frames;
    
    // Update values
    animatedValues.value = targets.map((target, i) => ({
      Paper: +(target.Paper * progress).toFixed(1),
      SurviveX: +(target.SurviveX * progress).toFixed(1),
      SurviveXAsync: target.SurviveXAsync ? +(target.SurviveXAsync * progress).toFixed(1) : null,
      SurviveXImprovement: +(target.SurviveXImprovement * progress).toFixed(1),
      asyncImprovement: target.asyncImprovement ? +(target.asyncImprovement * progress).toFixed(1) : null
    }));
    
    // Stop when done
    if (frame >= frames) {
      clearInterval(interval);
      
      // Set exact final values
      animatedValues.value = targets.map(target => ({
        Paper: +target.Paper.toFixed(1),
        SurviveX: +target.SurviveX.toFixed(1),
        SurviveXAsync: target.SurviveXAsync ? +target.SurviveXAsync.toFixed(1) : null,
        SurviveXImprovement: +target.SurviveXImprovement.toFixed(1),
        asyncImprovement: target.asyncImprovement ? +target.asyncImprovement.toFixed(1) : null
      }));
    }
  }, 1000 / fps);
}

// Start animations when the component is mounted
onMounted(() => {
  animationStarted.value = true;
  
  // Staggered animations
  setTimeout(() => { showBars.value = true; }, 300);
  setTimeout(() => { 
    showNumbers.value = true;
    animateCounters();
  }, 800);
  setTimeout(() => { showImprovements.value = true; }, 1500);
});
</script>

<template>
  <div class="performance-graph">
    <!-- Test Environment Card -->
    <div class="env-card fade-in">
      <h3>Test Environment</h3>
      <div class="env-grid">
        <div class="env-item">
          <span class="label">Version:</span> {{ environment.version }}
        </div>
        <div class="env-item">
          <span class="label">CPU:</span> {{ environment.cpu }}
        </div>
        <div class="env-item">
          <span class="label">JVM:</span> {{ environment.jvm }}
        </div>
        <div class="env-item">
          <span class="label">Memory:</span> {{ environment.memory }}
        </div>
        <div class="env-item">
          <span class="label">SurviveX Commit:</span> {{ environment.SurviveXCommit }}
        </div>
        <div class="env-item">
          <span class="label">Paper Commit:</span> {{ environment.paperCommit }}
        </div>
        <div class="env-item">
          <span class="label">Seed:</span> {{ environment.seed }}
        </div>
        <div class="env-item">
          <span class="label">Coords:</span> {{ environment.coords }}
        </div>
      </div>
      
      <div class="jvm-flags">
        <h4>JVM Flags</h4>
        <div class="code-block jvm-flags-code">{{ jvmFlags }}</div>
      </div>
    </div>

    <!-- Performance Chart -->
    <h3 class="fade-in" :style="{ animationDelay: '200ms' }">Performance Comparison (MSPT - lower is better)</h3>
    <div class="chart-container fade-in" :style="{ animationDelay: '300ms' }">
      <div class="chart">
        <div v-for="(data, dataIndex) in performanceData" :key="dataIndex" class="chart-group">
          <div class="chart-label">{{ data.name }}</div>
          <div class="chart-bars">
            <!-- Paper Bar -->
            <div class="bar-container">
              <div class="bar-wrapper">
                <div 
                  class="bar paper" 
                  :style="{ 
                    height: showBars ? `${data.Paper * scaleFactor}px` : '0px',
                    transitionDelay: `${dataIndex * 100}ms`
                  }"
                ></div>
              </div>
              <div 
                class="bar-value" 
                :class="{ 'show': showNumbers }"
                :style="{ transitionDelay: `${dataIndex * 100 + 200}ms` }"
              >
                {{ animatedValues[dataIndex].Paper }} mspt
              </div>
              <div 
                class="bar-name"
                :class="{ 'show': showNumbers }"
                :style="{ transitionDelay: `${dataIndex * 100 + 250}ms` }"
              >Paper</div>
            </div>
            
            <!-- SurviveX Bar -->
            <div class="bar-container">
              <div class="bar-wrapper">
                <div 
                  class="bar SurviveX" 
                  :style="{ 
                    height: showBars ? `${data.SurviveX * scaleFactor}px` : '0px',
                    transitionDelay: `${dataIndex * 100 + 150}ms`
                  }"
                ></div>
              </div>
              <div 
                class="bar-value"
                :class="{ 'show': showNumbers }"
                :style="{ transitionDelay: `${dataIndex * 100 + 300}ms` }"
              >
                {{ animatedValues[dataIndex].SurviveX }} mspt
              </div>
              <div 
                class="bar-name"
                :class="{ 'show': showNumbers }"
                :style="{ transitionDelay: `${dataIndex * 100 + 350}ms` }"
              >SurviveX</div>
            </div>
            
            <!-- SurviveX+Async Bar (when available) -->
            <div v-if="data.SurviveXAsync" class="bar-container">
              <div class="bar-wrapper">
                <div 
                  class="bar SurviveX-async" 
                  :style="{ 
                    height: showBars ? `${data.SurviveXAsync * scaleFactor}px` : '0px',
                    transitionDelay: `${dataIndex * 100 + 300}ms`
                  }"
                ></div>
              </div>
              <div 
                class="bar-value"
                :class="{ 'show': showNumbers }"
                :style="{ transitionDelay: `${dataIndex * 100 + 400}ms` }"
              >
                {{ animatedValues[dataIndex].SurviveXAsync }} mspt
              </div>
              <div 
                class="bar-name"
                :class="{ 'show': showNumbers }"
                :style="{ transitionDelay: `${dataIndex * 100 + 450}ms` }"
              >SurviveX+Async</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Improvement Cards -->
    <h3 class="fade-in" :style="{ animationDelay: '1200ms' }">Performance Improvement</h3>
    <div class="improvement-grid">
      <!-- Card 1 -->
      <div 
        class="improvement-card fade-slide-up" 
        :class="{ 'show': showImprovements }"
        :style="{ animationDelay: '0ms' }"
      >
        <div class="improvement-percentage counter">
          {{ animatedValues[0].SurviveXImprovement }}%
        </div>
        <div class="improvement-title">Default Configuration</div>
        <div class="improvement-details">
          SurviveX ({{ animatedValues[0].SurviveX }} mspt) vs Paper ({{ animatedValues[0].Paper }} mspt)
        </div>
      </div>
      
      <!-- Card 2 -->
      <div 
        class="improvement-card fade-slide-up" 
        :class="{ 'show': showImprovements }"
        :style="{ animationDelay: '200ms' }"
      >
        <div class="improvement-percentage counter">
          {{ animatedValues[1].SurviveXImprovement }}%
        </div>
        <div class="improvement-title">SurviveX with Increased Mob Caps</div>
        <div class="improvement-details">
          SurviveX ({{ animatedValues[1].SurviveX }} mspt) vs Paper ({{ animatedValues[1].Paper }} mspt)
        </div>
      </div>
      
      <!-- Card 3 -->
      <div 
        class="improvement-card highlight fade-slide-up" 
        :class="{ 'show': showImprovements }"
        :style="{ animationDelay: '400ms' }"
      >
        <div class="improvement-percentage counter">
          {{ animatedValues[1].asyncImprovement }}%
        </div>
        <div class="improvement-title">SurviveX+Async with Increased Mob Caps</div>
        <div class="improvement-details">
          SurviveX+Async ({{ animatedValues[1].SurviveXAsync }} mspt) vs Paper ({{ animatedValues[1].Paper }} mspt)
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.entity-performance-graph {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
}

.env-card {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
  transform-origin: top center;
}

h3 {
  font-size: 1.3rem;
  margin-bottom: 16px;
  font-weight: 600;
}

h4 {
  font-size: 1.1rem;
  margin-bottom: 12px;
  font-weight: 500;
}

.env-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.env-item {
  font-size: 0.9rem;
}

.label {
  font-weight: 600;
  margin-right: 6px;
}

.jvm-flags {
  margin-top: 8px;
}

.jvm-flags-code {
  font-size: 0.8rem;
  line-height: 1.4;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
}

.chart-container {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
  overflow: auto;
}

.chart {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  padding: 20px 0;
}

.chart-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 45%;
  min-width: 300px;
}

.chart-label {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 20px;
  text-align: center;
}

.chart-bars {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 40px;
  height: 220px;
  width: 100%;
}

.bar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
}

.bar-wrapper {
  height: 180px;
  display: flex;
  align-items: flex-end;
}

.bar {
  width: 60px;
  border-radius: 4px 4px 0 0;
  transition: height 1.2s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.5s ease;
  height: 0;
}

.bar.paper {
  background-color: #3498db;
}

.bar.SurviveX {
  background-color: #78C287;
}

.bar.SurviveX-async {
  background-color: #49B858;
  border: 1px solid #2c8038;
}

.bar-value {
  font-size: 0.9rem;
  margin-top: 8px;
  font-weight: 600;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.bar-value.show {
  opacity: 1;
  transform: translateY(0);
}

.bar-name {
  font-size: 0.9rem;
  margin-top: 4px;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.bar-name.show {
  opacity: 0.8;
  transform: translateY(0);
}

.improvement-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.improvement-card {
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-brand);
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.improvement-card.show {
  opacity: 1;
  transform: translateY(0);
}

.improvement-card:hover {
  border-color: var(--vp-c-brand-darker);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
}

.improvement-card.highlight {
  border: 2px solid var(--vp-c-brand);
  background-color: rgba(120, 194, 135, 0.1);
}

.improvement-card.highlight:hover {
  box-shadow: 0 6px 16px rgba(73, 184, 88, 0.2);
}

.improvement-percentage {
  font-size: 2rem;
  font-weight: 700;
  color: var(--vp-c-brand);
  margin-bottom: 8px;
}

.improvement-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.improvement-details {
  font-size: 0.9rem;
  opacity: 0.8;
}

.code-block {
  background-color: var(--vp-c-bg-alt);
  padding: 12px;
  border-radius: 6px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.9em;
  line-height: 1.5;
  overflow-x: auto;
  margin: 10px 0;
}

/* Animation classes */
.fade-in {
  animation: fadeIn 0.8s ease-out forwards;
  opacity: 0;
}

.fade-slide-up {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-up.show {
  opacity: 1;
  transform: translateY(0);
}

.counter {
  display: inline-block;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .env-grid {
    grid-template-columns: 1fr;
  }
  
  .chart-group {
    width: 100%;
  }
  
  .chart-bars {
    gap: 20px;
  }
  
  .bar-container {
    width: 50px;
  }
  
  .bar {
    width: 50px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bar, .bar-value, .bar-name, .improvement-card, .fade-in {
    transition: none !important;
    animation: none !important;
  }
  
  .bar {
    height: auto !important;
  }
  
  .bar-value, .bar-name, .improvement-card {
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>