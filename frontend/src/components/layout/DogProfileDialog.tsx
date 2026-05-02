import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import dogImage from '../../assets/dog_icon.jpeg';

type Props = {
  open: boolean;
  onClose: () => void;
};

// https://css-tricks.com/almanac/rules/k/keyframes/
// please make the dog dance
const keyframes = `
  @keyframes dogBounce {
    0%   { transform: translateY(0px) rotate(-3deg); }
    20%  { transform: translateY(-28px) rotate(4deg); }
    40%  { transform: translateY(-10px) rotate(-2deg); }
    60%  { transform: translateY(-22px) rotate(5deg); }
    80%  { transform: translateY(-6px) rotate(-1deg); }
    100% { transform: translateY(0px) rotate(-3deg); }
  }

  @keyframes signWiggle {
    0%   { transform: rotate(-2deg); }
    25%  { transform: rotate(2.5deg); }
    50%  { transform: rotate(-1.5deg); }
    75%  { transform: rotate(2deg); }
    100% { transform: rotate(-2deg); }
  }

  @keyframes starsFloat {
    0%   { opacity: 0; transform: translateY(0px) scale(0.5); }
    30%  { opacity: 1; }
    100% { opacity: 0; transform: translateY(-40px) scale(1.2); }
  }

  @keyframes fadeInDialog {
    from { opacity: 0; transform: scale(0.88) translateY(12px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
`;

// test if woof woof works haha
const STARS = ['⭐', '✨', '💫', '🐾', '❤️', ' woof woof 🐶'];

export default function DogProfileDialog({ open, onClose }: Props) {
  const [tick, setTick] = useState(0);

  // Re-trigger floating stars every few seconds
  useEffect(() => {
    if (!open) return;
    const id = setInterval(() => setTick((t) => t + 1), 2200);
    return () => clearInterval(id);
  }, [open]);

  return (
    <>
      <style>{keyframes}</style>

      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="xs"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: 4,
              overflow: 'visible',
              background: 'linear-gradient(155deg, #ff00bb 0%, #fee2fb 65%)',
              animation: open ? 'fadeInDialog 0.3s ease both' : 'none',
            },
          },
        }}
      >
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 10,
            color: 'text.secondary',
          }}
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>

        <DialogContent
          sx={{
            pt: 4,
            pb: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            overflow: 'visible',
          }}
        >
          {/* Dog + floating stars */}
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {/* Floating stars — re-keyed on tick so they replay */}
            {STARS.map((star, i) => (
              <Box
                key={`${tick}-${i}`}
                sx={{
                  position: 'absolute',
                  top: `${10 + (i % 3) * 15}%`,
                  left: i % 2 === 0 ? `${-30 - i * 8}px` : `${110 + i * 6}%`,
                  fontSize: 18,
                  animation: `starsFloat ${1.2 + i * 0.25}s ease ${i * 0.18}s both`,
                  pointerEvents: 'none',
                }}
              >
                {star}
              </Box>
            ))}

            {/* Bouncing Big dawwggggg */}
            <Box
              component="img"
              src={dogImage}
              alt="Big Dawg"
              sx={{
                width: 130,
                height: 130,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '4px solid #f5a623',
                boxShadow: '0 8px 24px rgba(245,166,35,0.35)',
                animation: 'dogBounce 1.8s ease-in-out infinite',
                transformOrigin: 'bottom center',
                display: 'block',
              }}
            />

            {/* Shadow that squishes as dog bounces */}
            <Box
              sx={{
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 80,
                height: 14,
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.12)',
                animation: 'dogBounce 1.8s ease-in-out infinite',
                animationDelay: '0.1s',
                filter: 'blur(3px)',
              }}
            />
          </Box>

          {/* Picket sign */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0,
            }}
          >
            {/* Sign board css stuff plus sign animation */}
            <Box
              sx={{
                background: '#fffdf5',
                border: '3px solid #8B5E3C',
                borderRadius: 2,
                padding: '14px 28px',
                textAlign: 'center',
                boxShadow: '4px 4px 0px #8B5E3C',
                animation: 'signWiggle 3s ease-in-out infinite',
                position: 'relative',
                minWidth: 220,
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"Comic Sans MS", "Chalkboard SE", cursive',
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#8B5E3C',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  mb: 0.5,
                }}
              >
                HCI
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Comic Sans MS", "Chalkboard SE", cursive',
                  fontSize: 18,
                  fontWeight: 900,
                  color: '#5C3D11',
                  lineHeight: 1.2,
                }}
              >
                Design Sprint 3
              </Typography>
            </Box>

            {/* Picket stake css stuff */}
            <Box
              sx={{
                width: 14,
                height: 48,
                background: 'linear-gradient(to bottom, #a0724a, #7a5230)',
                borderRadius: '0 0 3px 3px',
                boxShadow: '2px 2px 0 #5C3D11',
              }}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
